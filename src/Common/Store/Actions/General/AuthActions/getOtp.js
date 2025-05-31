// src/Common/Store/Actions/General/AuthActions/getOtp.js
import constants from '../../../../Constants';
import {GET_OTP} from '../../ActionTypes/ApiActionTypes';
import {
  GET_OTP_SUCCESS,
  GET_OTP_FAILURE,
} from '../../ActionTypes/ReduxActionTypes';

export const getOtp = ({
  email,
  device_name,
  os_version,
  device_identifier,
  platform_version,
  onSuccess,
  onFailure,
}) => ({
  type: GET_OTP,
  payload: {
    requestType: 'POST',
    apiUrl: constants.login + constants.version + constants.step1,
    reduxActionType: GET_OTP_SUCCESS,
    body: {email, device_name, os_version, device_identifier, platform_version},
    metaData: true,
    header: 'application/json',
    onSuccess,
    onFailure,
  },
});

// Optionally export the failure type for use inside SagaHelper
export const getOtpFailure = payload => ({type: GET_OTP_FAILURE, payload});
