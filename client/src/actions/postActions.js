import axios from 'axios';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const GET_ERRORS = 'GET_ERRORS';

export const getAllPosts = () => dispatch => {
  axios.get('/api/posts')
    .then(posts => {
      dispatch(receiveAllPosts(posts.data));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  payload: posts
});
