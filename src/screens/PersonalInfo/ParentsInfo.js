import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ParentsInfoScreen = () => {
  const navigation = useNavigation();

  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherQualification, setFatherQualification] = useState('');
  const [motherQualification, setMotherQualification] = useState('');

  const qualifications = [
    'Primary',
    'Middle',
    'Matric',
    'Intermediate',
    'Graduation',
    'Post Graduation',
    'Not Applicable',
  ];

  const handleNext = () => {
    if (!fatherName.trim() || !motherName.trim()) {
      Alert.alert('Error', 'Please fill in both names before proceeding.');
      return;
    }
    navigation.navigate('GuardianInfo'); // Replace with the actual next screen
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Parents Information
      </Text>

      {/* Father's Name Input */}
      <Text>Father's Name *</Text>
      <TextInput
        value={fatherName}
        onChangeText={setFatherName}
        placeholder="Enter Father's Name"
        style={styles.input}
      />

      {/* Mother's Name Input */}
      <Text>Mother's Name *</Text>
      <TextInput
        value={motherName}
        onChangeText={setMotherName}
        placeholder="Enter Mother's Name"
        style={styles.input}
      />

      {/* Father's Qualification */}
      <Text>Father's Qualification *</Text>
      {qualifications.map(qual => (
        <TouchableOpacity
          key={qual}
          onPress={() => setFatherQualification(qual)}
          style={styles.radioButton}>
          <View
            style={[
              styles.radioCircle,
              fatherQualification === qual && styles.selectedRadio,
            ]}
          />
          <Text>{qual}</Text>
        </TouchableOpacity>
      ))}

      {/* Mother's Qualification */}
      <Text>Mother's Qualification *</Text>
      {qualifications.map(qual => (
        <TouchableOpacity
          key={qual}
          onPress={() => setMotherQualification(qual)}
          style={styles.radioButton}>
          <View
            style={[
              styles.radioCircle,
              motherQualification === qual && styles.selectedRadio,
            ]}
          />
          <Text>{qual}</Text>
        </TouchableOpacity>
      ))}

      {/* Navigation Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
};

export default ParentsInfoScreen;
