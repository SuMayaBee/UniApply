// src/Common/Store/Actions/General/AuthActions/verifyOtp.js
import constants from '../../../../Constants';
import {VERIFY_OTP} from '../../ActionTypes/ApiActionTypes';
import {
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../../ActionTypes/ReduxActionTypes';

export const verifyOtp = ({
  email,
  otp,
  device_name,
  os_version,
  device_identifier,
  onSuccess,
  onFailure,
}) => ({
  type: VERIFY_OTP,
  payload: {
    requestType: 'POST',
    apiUrl: constants.login + constants.version + constants.step2,
    reduxActionType: VERIFY_OTP_SUCCESS,
    body: {email, otp, device_name, os_version, device_identifier},
    header: 'application/json',
    onSuccess,
    onFailure,
  },
});

export const verifyOtpFailure = payload => ({
  type: VERIFY_OTP_FAILURE,
  payload,
});
