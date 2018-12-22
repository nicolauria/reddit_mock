import { RECEIVE_ALL_POSTS, RECEIVE_POST } from '../actions/postActions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.payload
    case RECEIVE_POST:
      return [action.payload, ...state];
    default:
      return state;
  }
}
