// src/Common/Store/Reducers/mainReducer.js

import {
  REDUX_UPDATE_CURRENT_USER,
  REDUX_UPDATE_CURRENT_USER_ROLE,
  REDUX_UPDATE_USER_DATA,
  REDUX_LOGOUT_CURRENT_USER,
  REDUX_UPDATE_LOADING_STATE,
  REDUX_SET_AUTHENTICATED, // ← newly added
} from '../Actions/ActionTypes/ReduxActionTypes';

const initialState = {
  accesstoken: null,
  currentUser: null,
  currentUserDesignationsRoles: [],
  currentUserPermissions: [],
  userPermissions: [],
  userDepartments: [],
  userDesignation: [],
  userDevices: [],
  allUserPermissions: {},
  userSelectedRole: {},
  userRoles: [],
  isLoading: false,

  // ← flag for auth flow
  isAuthenticated: false,
  loginError: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case REDUX_SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case REDUX_UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.otpVerif.user,
        accesstoken: action.payload.otpVerif.access_token,
        currentUserDesignationsRoles:
          action.payload.otpVerif.user_roles_designations_departments,
        userSelectedRole:
          (action.payload.otpVerif.user_roles_designations_departments ||
            [])[0] || {},
        userPermissions: action.payload.otpVerif.collective_user_permissions,
        currentUserPermissions:
          action.payload.otpVerif.user_permissions[
            (action.payload.otpVerif.user_roles_designations_departments ||
              [])[0]?.user_role_designation_department_id
          ] || [],
        allUserPermissions: action.payload.otpVerif.user_permissions,
        userDepartments: action.payload.otpVerif.user_departments,
        userDesignation: action.payload.otpVerif.user_designations,
        userRoles: action.payload.otpVerif.user_roles,
        userDevices: action.payload.otpVerif.user_devices,

        // also mark authenticated on OTP success
        isAuthenticated: true,
        loginError: null,
      };

    case REDUX_UPDATE_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.requestParams,
        },
      };

    case REDUX_UPDATE_CURRENT_USER_ROLE:
      return {
        ...state,
        userSelectedRole: action.payload,
        currentUserPermissions:
          state.allUserPermissions[
            action.payload.user_role_designation_department_id
          ] || [],
      };

    case REDUX_UPDATE_LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };

    case REDUX_LOGOUT_CURRENT_USER:
      // reset to initial state, including auth flag
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default mainReducer;
