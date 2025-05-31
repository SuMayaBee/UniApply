import {select, put} from 'redux-saga/effects';
import {encryptObject, decryptObject} from './encryption';
import constants from '../../Constants';

// Environment configuration for encryption
const env = {
  SECRET_KEY: 'archdemo123',
  PLATFORM_KEY: 'UBS_DEV',
  PLATFORM_VERSION: '1.0',
  PLATFORM_NAME: 'Web App',
};

const debug_log = (should_log, text, variable) => {
  if (should_log) {
    console.log(`*** text *** ${text} ************`);
    console.log(`*** variable *** ${variable} ************`);
  }
};

function* fetchData(action, queryParameter, queryParameterId) {
  const updated_action = action?.payload || action;

  // Env check for encryption keys
  if (!env.PLATFORM_KEY || !env.SECRET_KEY) {
    updated_action?.onFailure({
      status: 401,
      frameworkStatusCode: 'E44',
      message: 'Encryption Failed [Env not found].',
    });
    return;
  }

  try {
    const all_state = yield select(state => state.main);
    const currentUser = yield select(state => state);
    const {userSelectedRole} = currentUser.main;
    const nextPart = updated_action?.apiUrl;
    const useBaseURL = updated_action?.useBaseURL !== false;
    const isEncrypted = updated_action?.isEncrypted !== false;

    let completeUrl = useBaseURL ? constants.base_url + nextPart : nextPart;
    if (queryParameter) completeUrl += queryParameter;
    if (queryParameterId) completeUrl += `&id=${queryParameterId}`;

    const hasMetaData = updated_action?.metaData;
    const isFormData = updated_action?.formData;
    const accessToken = all_state?.accesstoken || null;

    const request = {
      headers: {
        ...(isFormData ? {} : {'Content-Type': 'application/json'}),
        accesstoken: accessToken,
      },
      method: updated_action?.requestType || 'GET',
    };

    if (hasMetaData && accessToken === null) {
      console.warn(
        'metaData is true but access token is not present in header',
      );
    }

    // Handle request body encryption
    if (updated_action?.body && request.method !== 'GET') {
      // DELETE requests
      if (request.method === 'DELETE') {
        if (isEncrypted) {
          const deleteEncryption = encryptObject(
            {
              Id: `${updated_action.body.Id || null}`,
              actionPerformerURDD:
                userSelectedRole.user_role_designation_department_id,
            },
            env.PLATFORM_KEY,
          );
          const secondEncryption = {
            reqData: deleteEncryption,
            encryptionDetails: {
              PlatformName: env.PLATFORM_NAME,
              PlatformVersion: env.PLATFORM_VERSION,
            },
          };
          request.headers.encryptedrequest = encryptObject(
            secondEncryption,
            env.SECRET_KEY,
          );
        } else {
          request.headers.reqData = {
            Id: `${updated_action.body.Id || null}`,
            actionPerformerURDD:
              userSelectedRole.user_role_designation_department_id || null,
          };
        }
      } else {
        // Non-DELETE with body
        if (isEncrypted) {
          request.body = {encryptedRequest: {}};
          const finalActionBody = isFormData
            ? updated_action.body
            : {
                ...updated_action.body,
                actionPerformerURDD:
                  userSelectedRole.user_role_designation_department_id,
              };
          const firstEncryption = encryptObject(
            finalActionBody,
            env.PLATFORM_KEY,
          );
          const secondEncryption = {
            reqData: firstEncryption,
            encryptionDetails: {
              PlatformName: env.PLATFORM_NAME,
              PlatformVersion: env.PLATFORM_VERSION,
            },
          };
          request.body.encryptedRequest = encryptObject(
            secondEncryption,
            env.SECRET_KEY,
          );
          request.body = JSON.stringify(request.body);
        } else {
          request.body = JSON.stringify({
            ...updated_action.body,
            actionPerformerURDD:
              userSelectedRole.user_role_designation_department_id,
          });
        }
      }
    } else if (isEncrypted) {
      // GET or no-body encrypted header
      const finalActionBody = isFormData
        ? updated_action.body
        : {
            ...updated_action.body,
            actionPerformerURDD:
              userSelectedRole.user_role_designation_department_id,
          };
      const firstEncryption = encryptObject(finalActionBody, env.PLATFORM_KEY);
      const secondEncryption = {
        reqData: firstEncryption,
        encryptionDetails: {
          PlatformName: env.PLATFORM_NAME,
          PlatformVersion: env.PLATFORM_VERSION,
        },
      };
      request.headers.encryptedRequest = encryptObject(
        secondEncryption,
        env.SECRET_KEY,
      );
    }

    console.log('Complete URL', completeUrl);
    const response = yield fetch(completeUrl, request).catch(err => {
      console.log(`Network error: ${err.message}`);
      return;
    });

    let responseData = yield response.json();
    console.log('responseData::::', responseData);

    if (responseData.status !== 200) {
      const frameworkErrorMessage = getFrameworkErrorMessage(
        responseData.status,
        responseData.scc,
      );
      updated_action?.onFailure({
        status: responseData.status,
        frameworkStatusCode: responseData.scc,
        message: frameworkErrorMessage || responseData.message,
      });
      return;
    }

    // Decrypt payload if needed
    if (responseData.payload && isEncrypted) {
      responseData = decryptObject(responseData.payload, env.PLATFORM_KEY);
    } else {
      responseData = responseData.payload;
    }

    // Dispatch Redux action
    if (updated_action.reduxActionType) {
      yield put({
        type: updated_action.reduxActionType,
        payload: responseData,
        requestParams: updated_action.body,
      });
    }

    // Call onSuccess callback
    if (typeof updated_action.onSuccess === 'function') {
      updated_action.onSuccess(responseData);
    }
  } catch (error) {
    console.error(`******** Error in fetchData ******* : ${error.message}`);
    updated_action?.onFailure({message: error.message});
  }
}

// Helper to map framework error codes to messages
const getFrameworkErrorMessage = (statusCode, frameworkStatusCode) => {
  const errorMessages = {
    E10: 'Parameter name does not exist.',
    E11: 'Parameter validation failure.',
    E12: 'Parameter missing in source.',
    E13: 'Required parameter missing.',
    E14: 'No request body found.',
    E20: 'Invalid or missing query nature.',
    E21: 'Invalid or missing query payload.',
    E22: 'Callback function error.',
    E23: 'Callback function missing.',
    E24: 'Payload function error.',
    E25: 'Payload function missing.',
    E30: 'Invalid or missing request method.',
    E31: 'Invalid or missing permission.',
    E32: 'Invalid page size value.',
    E40: 'Invalid or expired token.',
    E41: 'Permission validation failure.',
    E42: 'OTP verification failure.',
    E43: 'Object resolver failure.',
    E44: 'Database connection failed.',
    E50: 'API version does not exist.',
    E51: 'API object does not exist.',
    E52: 'Mismatch request method.',
  };

  return (
    errorMessages[frameworkStatusCode] ||
    `Unexpected error (Code: ${frameworkStatusCode})`
  );
};

export default fetchData;
