import axios from 'axios';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const getComments = parentId => dispatch => {
  axios.get(`/api/comments/${parentId}`)
    .then(comments => {
      dispatch(receiveComments(comments.data, parentId))
    })
    .catch(err => console.log(err));
};

const receiveComments = (comments, parentId) => ({
    type: RECEIVE_COMMENTS,
    payload: comments,
    parentId: parentId
});

export const likeComment = commentId => dispatch => {
  axios.post(`/api/comments/${commentId}/like`)
    .then(comment => {
      dispatch(updateComment(comment.data));
    }).then(() => getComments());
};

export const editComment = comment => dispatch => {
  axios.put(`/api/comments/${comment.id}`, comment)
    .then(comment => dispatch(updateComment(comment.data)));
};

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  payload: comment
});

export const addComment = (parentId, comment) => dispatch => {
  axios.post(`/api/comments/${parentId}`, comment)
    .then(comment => {
      dispatch(receiveComment(parentId, comment.data));
    })
}

const receiveComment = (parentId, comment) => {
  return {
    type: RECEIVE_COMMENT,
    payload: comment,
    parentId: parentId
  }
}

export const removeComment = commentId => dispatch => {
  axios.delete(`/api/comments/${commentId}`).then(comment => {
    dispatch(deleteComment(comment.data))
  })
};

const deleteComment = comment => ({
  type: REMOVE_COMMENT,
  payload: comment
});
