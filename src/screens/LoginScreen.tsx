// src/screens/LoginScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getOtp} from '../Common/Store/Actions/General/AuthActions/getOtp';
import {verifyOtp} from '../Common/Store/Actions/General/AuthActions/verifyOtp';

// ← an action that your mainReducer will handle by doing `isAuthenticated = true`
import {setAuthenticated} from '../Common/Store/Actions/General/AuthActions/setAuthenticated';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {loginError} = useSelector((s: any) => s.main);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (loginError) {
      Alert.alert('Login Error', loginError);
      setStep(1);
    }
  }, [loginError]);

  const onPress = () => {
    if (step === 1) {
      if (!email.trim())
        return Alert.alert('Error', 'Please enter your email.');
      dispatch(
        getOtp({
          email,
          device_name: 'RN',
          os_version: '1.0',
          device_identifier: 'my-device-id',
          onSuccess: () => setStep(2),
          onFailure: err => Alert.alert('Error', err.message),
        }),
      );
    } else {
      if (!otp.trim()) return Alert.alert('Error', 'Please enter the OTP.');
      dispatch(
        verifyOtp({
          email,
          otp,
          device_name: 'RN',
          os_version: '1.0',
          device_identifier: 'my-device-id',
          onSuccess: () => {
            // 1) mark authenticated in Redux
            dispatch(setAuthenticated(true));
            // 2) AppNavigator will automatically re-render into the Home screen
          },
          onFailure: err => Alert.alert('Error', err.message),
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {step === 2 && (
        <CustomTextInput
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          style={styles.input}
        />
      )}
      <CustomButton
        title={step === 1 ? 'Send OTP' : 'Verify OTP'}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  input: {marginBottom: 15},
});

export default LoginScreen;
