import {REDUX_SET_AUTHENTICATED} from '../../ActionTypes/ReduxActionTypes';

export const setAuthenticated = flag => ({
  type: REDUX_SET_AUTHENTICATED,
  payload: flag,
});
