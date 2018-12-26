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

  // method used to hide/display reply input
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

  render() {
    let comments;
    if (this.props.comments) {
      comments = this.props.comments.map(comment => {
        return <Comment comment={comment}
          status={this.props.post.open} key={comment._id}/>
      })
    }

    let closePostToggle;
    // allow post creator to open/close post
    if (this.props.post.user.toString() === this.props.auth.user.id) {
      let text = this.props.post.open ? 'close post' : 'open post';
      closePostToggle = <span className="close-post"
        onClick={this.closePost}>{text}</span>;
    }

    let closedPostText;
    // display closed post text if post is closed
    if (!this.props.post.open) {
      closedPostText = <span>This post has been closed</span>;
    }

    let toggleReplyInput;
    let replyInput;
    // allow reply if post is open
    if (this.props.post.open) {
      toggleReplyInput = <span onClick={this.toggleReply} className="reply">reply</span>;
      replyInput = <Reply comment={this.props.post} />
    }

    return (
      <div className="post">
      {closedPostText}{closePostToggle}
        <div className="post-content">
          <div>
            <img className="rounded-circle"
                 src={this.props.post.avatar}
                 alt="" />
          </div>
          <div>
            <span className="post-author">{this.props.post.name}</span>
            <p className="post-body">{this.props.post.text}</p>
            {toggleReplyInput}
            <span className="reply-div post-reply-div"
              id={`reply-div-${this.props.post._id}`}>{replyInput}</span>
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
