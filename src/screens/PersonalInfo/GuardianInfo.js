import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const GuardianInfo = ({navigation}) => {
  const [guardianFirstName, setGuardianFirstName] = useState('');
  const [guardianLastName, setGuardianLastName] = useState('');
  const [guardianCNIC, setGuardianCNIC] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianOccupation, setGuardianOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [postalAddress, setPostalAddress] = useState('');

  // Define the handleNext function here
  const handleNext = () => {
    navigation.navigate('SecondaryEducation'); // Navigate to the SecondryEducation screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guardian Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Guardian's First Name *"
        value={guardianFirstName}
        onChangeText={setGuardianFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Guardian's Last Name *"
        value={guardianLastName}
        onChangeText={setGuardianLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Guardian's CNIC *"
        keyboardType="numeric"
        value={guardianCNIC}
        onChangeText={setGuardianCNIC}
      />

      <TextInput
        style={styles.input}
        placeholder="Guardian's Phone Number *"
        keyboardType="phone-pad"
        value={guardianPhone}
        onChangeText={setGuardianPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Guardian's Occupation *"
        value={guardianOccupation}
        onChangeText={setGuardianOccupation}
      />

      <TextInput
        style={styles.input}
        placeholder="Monthly Household Income *"
        keyboardType="numeric"
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
      />

      <TextInput
        style={styles.input}
        placeholder="Postal Address"
        value={postalAddress}
        onChangeText={setPostalAddress}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()} // Navigates back to ParentsInfo
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={() => console.log('Save Guardian Info')} // Replace with actual save logic
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        {/* Add the Next Button */}
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext} // Call handleNext function to navigate
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',
  },
  nextButton: {
    backgroundColor: '#28a745', // You can adjust this color to match your app's theme
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default GuardianInfo;
