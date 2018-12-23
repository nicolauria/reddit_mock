import React from 'react';
import { connect } from 'react-redux';
import { getComments, likeComment } from '../actions/commentActions';
import Reply from './Reply';
import EditComment from './EditComment';
import Comment from './Comment';
import RemoveComment from './RemoveComment';

class CommentTwo extends React.Component {
  constructor(props) {
    super(props);
    this.toggleReply = this.toggleReply.bind(this);
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.getComments(this.props.comment._id);
  }

  likeComment() {
    if (this.props.status) {
      this.props.likeComment(this.props.comment._id);
    }
  }

  toggleReply() {
    const replyDiv = document.getElementById(`reply-div-${this.props.comment._id}`);
    if (replyDiv.style.display === 'block') {
      replyDiv.style.display = 'none';
    } else {
      replyDiv.style.display = 'block';
      const editDiv = document.getElementById(`edit-div-${this.props.comment._id}`);
      if (editDiv.style.display = 'block') editDiv.style.display = 'none';
    }
  }

  toggleEdit() {
    const editDiv = document.getElementById(`edit-div-${this.props.comment._id}`);
    if (editDiv.style.display === 'block') {
      editDiv.style.display = 'none';
    } else {
      editDiv.style.display = 'block';
      const replyDiv = document.getElementById(`reply-div-${this.props.comment._id}`);
      if (replyDiv.style.display = 'block') replyDiv.style.display = 'none';
    }
  }

  toggleRemove() {
    const removeDiv = document.getElementById(`remove-div-${this.props.comment._id}`);
    if (removeDiv.style.display === 'block') {
      removeDiv.style.display = 'none';
    } else {
      removeDiv.style.display = 'block';
      const replyDiv = document.getElementById(`reply-div-${this.props.comment._id}`);
      if (replyDiv.style.display = 'block') replyDiv.style.display = 'none';
      const editDiv = document.getElementById(`edit-div-${this.props.comment._id}`);
      if (editDiv.style.display = 'block') editDiv.style.display = 'none';
    }
  }

  render() {
    let comments = null;
    if (this.props.comments[this.props.comment._id]) {
      comments = this.props.comments[this.props.comment._id].map(comment => {
        return <Comment comment={comment} status={this.props.status} />
      })
    }

    let reply = null;
    if (this.props.comment.open) {
      reply = <Reply comment={this.props.comment} />
    }

    let editComment = null;
    let removeComment = null;
    if (this.props.auth.user.id === this.props.comment.user) {
      editComment = <span className="edit-comment" onClick={this.toggleEdit.bind(this)}>edit</span>;
      removeComment = <span className="remove-comment" onClick={this.toggleRemove.bind(this)}>remove</span>;
    }

    let commentOptions = null;
    if (this.props.status) commentOptions = <span>
      <span onClick={this.toggleReply} className="reply">reply</span>
      {editComment}{removeComment}
    </span>;

    return (
      <div className="comment">
        <div className="comment-author">
        <img className="small-circle"
             src={this.props.comment.avatar} />
          {this.props.comment.name}
        </div>
        <div className="comment-section">
          <div className="comment-text">
            {this.props.comment.text}
          </div>
          <div className="likes">
            {this.props.comment.likes.length}
            <img
              className="like-image"
              src={require('./like-icon.png')}
              onClick={this.likeComment.bind(this)} />
            {commentOptions}
          </div>
          <span className="reply-div" id={`reply-div-${this.props.comment._id}`}>{reply}</span>
          <span className="edit-div" id={`edit-div-${this.props.comment._id}`}>{<EditComment comment={this.props.comment}/>}</span>
          <span className="remove-div" id={`remove-div-${this.props.comment._id}`}>{<RemoveComment comment={this.props.comment}/>}</span>
        </div>
        <br />
        {comments}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  comments: state.comments,
  likes: ownProps.comment.likes
});

const mapDispatchToProps = dispatch => ({
  getComments: parentId => dispatch(getComments(parentId)),
  likeComment: commentId => dispatch(likeComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentTwo)
