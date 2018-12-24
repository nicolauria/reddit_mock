import React from 'react';
import { connect } from 'react-redux';
import { getComments } from '../actions/commentActions';
import Comment from './Comment';
import Reply from './Reply';
import { closePost } from '../actions/postActions';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.toggleReply = this.toggleReply.bind(this);
    this.closePost = this.closePost.bind(this);
  }

  componentWillMount() {
    this.props.getComments(this.props.post._id);
  }

  toggleReply() {
    const replyDiv = document.getElementById(`reply-div-${this.props.post._id}`);
    if (replyDiv.style.display === 'block') {
      replyDiv.style.display = 'none';
    } else {
      replyDiv.style.display = 'block';
    }
  }

  closePost() {
    this.props.closePost(this.props.post);
  }

  commentLikes(user) {
    this.state.likes.push(user);
  }

  render() {
    let comments = null;
    if (this.props.comments) {
      comments = this.props.comments.map(comment => {
        return <Comment comment={comment}
                        status={this.props.post.open}
                        key={comment._id}/>
      })
    }

    let closePost;
    if (this.props.post.user.toString() === this.props.auth.user.id) {
      if (this.props.post.open) {
        closePost = <span className="close-post"
          onClick={this.closePost}>close post</span>;
      } else {
        closePost = <span className="close-post"
          onClick={this.closePost}>open post</span>;
      }
    }

    let replyText;
    let reply = null;
    let closedPost;
    if (this.props.post.open) {
      replyText = <span onClick={this.toggleReply} className="reply">reply</span>;
      reply = <Reply comment={this.props.post} />
    } else {
      closedPost = <span>This post has been closed</span>;
    }

    return (
      <div className="post">
      {closedPost}{closePost}
        <div className="post-content">
          <div>
            <img className="rounded-circle"
                 src={this.props.post.avatar}
                 alt="" />
          </div>
          <div>
            <span className="post-author">{this.props.post.name}</span>
            <p className="post-body">{this.props.post.text}</p>
            {replyText}
            <span className="reply-div post-reply-div" id={`reply-div-${this.props.post._id}`}>{reply}</span>
          </div>
        </div>
        <div className="comments">
          {comments}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  comments: state.comments[ownProps.post._id]
});

const mapDispatchToProps = dispatch => ({
  getComments: parentId => dispatch(getComments(parentId)),
  closePost: post => dispatch(closePost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
