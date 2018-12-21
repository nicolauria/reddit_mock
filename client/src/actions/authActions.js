import { RECEIVE_CURRENT_USER } from './types';

export const registerUser = (userData) => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: userData
  }
}
