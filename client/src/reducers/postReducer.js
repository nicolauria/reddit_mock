import { RECEIVE_ALL_POSTS } from '../actions/postActions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.payload
    default:
      return state;
  }
}
