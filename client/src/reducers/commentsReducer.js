import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT
} from '../actions/commentActions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      if (action.payload.length === 0) return state;
      return {
         ...state,
         [action.parentId]: action.payload
       }
    //return Object.assign({}, state, { [action.parentId]: action.payload });
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
        [action.payload.parentId]: newState.sort(compare)
      }
    case REMOVE_COMMENT:
    let removeIndex;
    let removedState = state[action.payload.parentId].map((comment, idx) => {
      if (comment._id === action.payload._id) removeIndex = idx;
      return comment;
    });
    removedState.splice(removeIndex, 1);
    return {
      ...state,
      [action.payload.parentId]: removedState
    }
    default:
      return state;
  }
}

function compare(a, b) {
  if (b.likes.length > a.likes.length) {
    return 1;
  } else {
    return -1;
  }
}
