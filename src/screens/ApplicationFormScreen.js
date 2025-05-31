import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomDropdown from '../components/CustomDropdown';

const ApplicationFormScreen = ({navigation}) => {
  const [applyFor, setApplyFor] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobile, setMobile] = useState('');
  const [secondaryMobile, setSecondaryMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleNext = () => {
    // if (
    //   !applyFor ||
    //   !firstName ||
    //   !lastName ||
    //   !cnic ||
    //   !mobile ||
    //   !email ||
    //   !gender
    // ) {
    //   alert('Please fill all required fields.');
    //   return;
    // }
    navigation.navigate('ApplicantInfo'); // Navigate to ApplicantInfo screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Application Form</Text>

      <CustomDropdown
        label="Apply For"
        options={['Bachelors', 'Masters', 'PhD']}
        selectedValue={applyFor}
        onValueChange={setApplyFor}
      />

      <CustomTextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <CustomTextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <CustomTextInput
        placeholder="CNIC No."
        value={cnic}
        onChangeText={setCnic}
        keyboardType="numeric"
      />

      <CustomTextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
      />

      <CustomTextInput
        placeholder="Secondary Mobile Number"
        value={secondaryMobile}
        onChangeText={setSecondaryMobile}
        keyboardType="numeric"
      />

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <CustomDropdown
        label="Gender"
        options={['Male', 'Female', 'Other']}
        selectedValue={gender}
        onValueChange={setGender}
      />

      <CustomButton title="Next" onPress={handleNext} style={styles.button} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default ApplicationFormScreen;
