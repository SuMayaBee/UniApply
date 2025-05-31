import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const AddressInfo = ({navigation}) => {
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  // Handle checkbox toggle
  const handleCheckbox = () => {
    setSameAsPermanent(!sameAsPermanent);
    if (!sameAsPermanent) {
      setCurrentAddress(permanentAddress); // Copy permanent address when checked
    } else {
      setCurrentAddress(''); // Clear when unchecked
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Address Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Permanent Address *"
        value={permanentAddress}
        onChangeText={setPermanentAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Current Address *"
        value={sameAsPermanent ? permanentAddress : currentAddress}
        onChangeText={setCurrentAddress}
        editable={!sameAsPermanent} // Disable if checkbox is checked
      />

      <View style={styles.checkboxContainer}>
        <CheckBox value={sameAsPermanent} onValueChange={handleCheckbox} />
        <Text style={styles.checkboxText}>Same as Permanent Address</Text>
      </View>

      <TextInput style={styles.input} placeholder="City *" />
      <TextInput style={styles.input} placeholder="Current City *" />
      <TextInput style={styles.input} placeholder="Province *" />
      <TextInput style={styles.input} placeholder="Current Province *" />
      <TextInput style={styles.input} placeholder="Postal Code" />
      <TextInput style={styles.input} placeholder="Current Postal Code" />
      <TextInput style={styles.input} placeholder="Country *" />
      <TextInput style={styles.input} placeholder="Current Country *" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ParentsInfo')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F8FF',
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressInfo;
