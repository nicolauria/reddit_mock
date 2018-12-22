import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  UPDATE_COMMENT,
} from '../actions/commentActions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.parentId]: action.payload
      }
    case RECEIVE_COMMENT:
      if (state[action.parentId]) {
        return {
          ...state,
          [action.parentId]: [action.payload, ...state[action.parentId]]
        }
      }
      return {
        ...state,
        [action.parentId]: [action.payload]
      }
    case UPDATE_COMMENT:
      let newState = state[action.payload.parentId].map(comment => {
        if (comment._id === action.payload._id) {
          return action.payload;
        }
        return comment;
      });
      return {
        ...state,
        [action.payload.parentId]: newState
      }
    default:
      return state;
  }
}
