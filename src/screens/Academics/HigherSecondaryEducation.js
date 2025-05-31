import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import CustomDropdown from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

const HigherSecondaryEducation = () => {
  const navigation = useNavigation();

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [startingYear, setStartingYear] = useState('');
  const [endingYear, setEndingYear] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [percentage, setPercentage] = useState('');
  const [resultCardFile, setResultCardFile] = useState(null);
  const [equivalenceFile, setEquivalenceFile] = useState(null);

  const pakBoards = [
    'BISE Lahore',
    'BISE Gujranwala',
    'BISE Karachi',
    'BISE Multan',
    'BISE Faisalabad',
    'BISE Rawalpindi',
    'BISE Sahiwal',
    'BISE Bahawalpur',
    'BISE DG Khan',
    'FBISE',
  ];

  const aLevelBoards = [
    'Cambridge International',
    'Edexcel (Pearson)',
    'Oxford AQA',
    'Other A Level Board',
  ];

  const generateYears = () => {
    const years = [];
    for (let year = 2000; year <= 2030; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const handleTotalMarksChange = value => {
    setTotalMarks(value);
    calculatePercentage(value, obtainedMarks);
  };

  const handleObtainedMarksChange = value => {
    setObtainedMarks(value);
    calculatePercentage(totalMarks, value);
  };

  const calculatePercentage = (total, obtained) => {
    const totalNum = parseFloat(total);
    const obtainedNum = parseFloat(obtained);
    if (!isNaN(totalNum) && !isNaN(obtainedNum) && totalNum > 0) {
      const percent = ((obtainedNum / totalNum) * 100).toFixed(2);
      setPercentage(percent);
    } else {
      setPercentage('');
    }
  };

  const handleResultCardUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setResultCardFile(res);
      Alert.alert('Uploaded', `Result Card: ${res.name}`);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to pick result card');
      }
    }
  };

  const handleEquivalenceUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setEquivalenceFile(res);
      Alert.alert('Uploaded', `Equivalence Certificate: ${res.name}`);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to pick equivalence certificate');
      }
    }
  };

  const handleNext = () => {
    navigation.navigate('BachelorsEducation');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Higher Secondary Level</Text>

      <CustomDropdown
        label="Select Class *"
        options={['FSC Pre-Medical', 'FSC Pre-Engineering', 'A Level']}
        selectedValue={selectedClass}
        onValueChange={setSelectedClass}
      />

      <CustomDropdown
        label="Select Board *"
        options={selectedClass === 'A Level' ? aLevelBoards : pakBoards}
        selectedValue={selectedBoard}
        onValueChange={setSelectedBoard}
      />

      <CustomDropdown
        label="Select Starting Year *"
        options={generateYears()}
        selectedValue={startingYear}
        onValueChange={setStartingYear}
      />

      <CustomDropdown
        label="Select Ending Year *"
        options={generateYears()}
        selectedValue={endingYear}
        onValueChange={setEndingYear}
      />

      <CustomTextInput
        label="Institute Name *"
        value={instituteName}
        onChangeText={setInstituteName}
      />

      <CustomTextInput
        label="Total Marks *"
        value={totalMarks}
        onChangeText={handleTotalMarksChange}
        keyboardType="numeric"
      />

      <CustomTextInput
        label="Obtained Marks *"
        value={obtainedMarks}
        onChangeText={handleObtainedMarksChange}
        keyboardType="numeric"
      />

      <CustomTextInput
        label="Percentage %"
        value={percentage}
        editable={false}
      />

      {selectedClass === 'A Level' && (
        <>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleEquivalenceUpload}>
            <Text style={styles.uploadText}>
              ↑ Upload Equivalence Certificate *
            </Text>
          </TouchableOpacity>
          {equivalenceFile && (
            <Text style={styles.fileName}>✔ {equivalenceFile.name}</Text>
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleResultCardUpload}>
        <Text style={styles.uploadText}>↑ Upload Result Card *</Text>
      </TouchableOpacity>
      {resultCardFile && (
        <Text style={styles.fileName}>✔ {resultCardFile.name}</Text>
      )}

      <View style={styles.saveButton}>
        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#d4f8f4',
    paddingVertical: 10,
    borderRadius: 6,
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  uploadText: {
    fontWeight: 'bold',
    color: '#333',
  },
  fileName: {
    textAlign: 'center',
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default HigherSecondaryEducation;
