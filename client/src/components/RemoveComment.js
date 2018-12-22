import React from 'react';
import { connect } from 'react-redux';
import { removeComment } from '../actions/commentActions';

class RemoveComment extends React.Component {
  removeComment() {
    this.props.removeComment(this.props.comment._id);
    const removeDiv = document.getElementById(`remove-div-${this.props.comment._id}`);
    removeDiv.style.display = 'none';
  }

  closeRemove() {
    const removeDiv = document.getElementById(`remove-div-${this.props.comment._id}`);
    removeDiv.style.display = 'none';
  }

  render() {
    return (
      <div className="remove-comment-div">
        <p>Are you sure you want to remove this comment?</p>
        <span className="remove-comment-confirm" onClick={this.removeComment.bind(this)}>yes</span>
        <span className="remove-comment-confirm" onClick={this.closeRemove.bind(this)}>no</span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeComment: commentId => dispatch(removeComment(commentId))
})

export default connect(null, mapDispatchToProps)(RemoveComment);
