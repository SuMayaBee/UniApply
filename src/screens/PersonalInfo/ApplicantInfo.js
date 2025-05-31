import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'react-native-image-picker';

const ApplicantInfo = ({navigation}) => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [domicileCity, setDomicileCity] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [religion, setReligion] = useState('');
  const [domicileProvince, setDomicileProvince] = useState('');
  const [dualNationality, setDualNationality] = useState(null);
  const [disability, setDisability] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cnic, setCnic] = useState(null);

  const handleFileUpload = async setFile => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setFile(response.assets[0].uri);
      }
    });
  };

  const handleNext = () => {
    // if (
    //   !dateOfBirth ||
    //   !nationality ||
    //   !domicileProvince ||
    //   !religion ||
    //   !photo ||
    //   !cnic
    // ) {
    //   alert('Please fill all required fields.');
    //   return;
    // }
    navigation.navigate('AddressInfo'); // Replace with the actual next screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Applicant Information</Text>

      <CustomTextInput
        placeholder="Date of Birth *"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <CustomDropdown
        label="Your Religion *"
        options={['Islam', 'Christianity', 'Hinduism', 'Other']}
        selectedValue={religion}
        onValueChange={setReligion}
      />

      <CustomTextInput
        placeholder="Nationality *"
        value={nationality}
        onChangeText={setNationality}
      />

      <CustomDropdown
        label="Domicile Province *"
        options={['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Other']}
        selectedValue={domicileProvince}
        onValueChange={setDomicileProvince}
      />

      <CustomTextInput
        placeholder="Domicile City"
        value={domicileCity}
        onChangeText={setDomicileCity}
      />

      <CustomTextInput
        placeholder="Passport Number"
        value={passportNumber}
        onChangeText={setPassportNumber}
      />

      <View style={styles.radioGroup}>
        <Text style={styles.label}>Do you have dual nationality?</Text>
        <View style={styles.radioOptions}>
          <TouchableOpacity
            onPress={() => setDualNationality(true)}
            style={styles.radioOption}>
            <Text>{dualNationality === true ? '🔘' : '⚪'} Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDualNationality(false)}
            style={styles.radioOption}>
            <Text>{dualNationality === false ? '🔘' : '⚪'} No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.radioGroup}>
        <Text style={styles.label}>Do you have any disability?</Text>
        <View style={styles.radioOptions}>
          <TouchableOpacity
            onPress={() => setDisability(true)}
            style={styles.radioOption}>
            <Text>{disability === true ? '🔘' : '⚪'} Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisability(false)}
            style={styles.radioOption}>
            <Text>{disability === false ? '🔘' : '⚪'} No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleFileUpload(setPhoto)}>
        <Text>📷 Upload Photograph *</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleFileUpload(setCnic)}>
        <Text>📄 Upload CNIC/Birth Certificate *</Text>
      </TouchableOpacity>

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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#444',
  },
  radioGroup: {
    marginVertical: 10,
  },
  radioOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default ApplicantInfo;
