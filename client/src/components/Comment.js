import React from 'react';
import { connect } from 'react-redux';
import { getComments, likeComment } from '../actions/commentActions';
import Reply from './Reply';

class Comment extends React.Component {
  componentDidMount() {
    // this.props.getComments(this.props.comment._id);
  }

  likeComment() {
    this.props.likeComment(this.props.comment._id);
  }

  render() {
    let comments = null;
    if (this.props.comments && this.props.comments[this.props.comment._id]) {
      comments = this.props.comments[this.props.comment._id].map(comment => {
        return <Comment comment={comment} />
      })
    }
    let reply = null;
    if (this.props.comment.open) {
      reply = <Reply comment={this.props.comment} />
    }

    return (
      <div className="comment">
        <div className="comment-author">
          {this.props.comment.name}
        </div>
        <div className="comment-text">
          {this.props.comment.text}
        </div>
        <div className="likes">
          {this.props.comment.likes.length}
          <img
            className="like-image"
            src={require('./like-icon.png')}
            onClick={this.likeComment.bind(this)} />
          <span className="reply">reply</span>
        </div>
        {reply}<br />
        {comments}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments,
  likes: ownProps.comment.likes
});

const mapDispatchToProps = dispatch => ({
  getComments: parentId => dispatch(getComments(parentId)),
  likeComment: commentId => dispatch(likeComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
