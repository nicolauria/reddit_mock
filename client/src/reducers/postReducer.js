import { RECEIVE_ALL_POSTS, RECEIVE_POST, UPDATE_POST } from '../actions/postActions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.payload
    case RECEIVE_POST:
      return [action.payload, ...state];
    case UPDATE_POST:
      let newState = state.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      return newState;
    default:
      return state;
  }
}
