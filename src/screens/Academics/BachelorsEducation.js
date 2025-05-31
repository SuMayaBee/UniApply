import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomDropdown from '../../components/CustomDropdown';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';

const BachelorsEducation = () => {
  const navigation = useNavigation();

  const [degreeTitle, setDegreeTitle] = useState('');
  const [degreeDuration, setDegreeDuration] = useState('');
  const [startingYear, setStartingYear] = useState('');
  const [endingYear, setEndingYear] = useState('');
  const [marksType, setMarksType] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalCGPA, setTotalCGPA] = useState('');
  const [obtainedCGPA, setObtainedCGPA] = useState('');
  const [percentage, setPercentage] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [degree, setDegree] = useState(null);

  const generateYears = () => {
    const years = [];
    for (let year = 2000; year <= 2030; year++) {
      years.push(year.toString());
    }
    return years;
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

  const handleMarksTypeChange = value => {
    setMarksType(value);
    setPercentage('');
    if (value === 'Marks') {
      setTotalCGPA('');
      setObtainedCGPA('');
    } else {
      setTotalMarks('');
      setObtainedMarks('');
    }
  };

  const handleTotalMarksChange = value => {
    setTotalMarks(value);
    calculatePercentage(value, obtainedMarks);
  };

  const handleObtainedMarksChange = value => {
    setObtainedMarks(value);
    calculatePercentage(totalMarks, value);
  };

  const handleTotalCGPAChange = value => {
    setTotalCGPA(value);
    calculatePercentage(value, obtainedCGPA);
  };

  const handleObtainedCGPAChange = value => {
    setObtainedCGPA(value);
    calculatePercentage(totalCGPA, value);
  };

  const handleNext = () => {
    navigation.navigate('MastersEducation'); 
  };

  const handleDegreeUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setDegree(res);
      Alert.alert('Uploaded', `Degree : ${res.name}`);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to pick degree');
      }
    }
  };

    const handleTranscriptUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setTranscript(res);
      Alert.alert('Uploaded', `Transcript : ${res.name}`);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to pick transcript');
      }
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Bachelor Level</Text>

      <CustomTextInput
        label="Degree Title *"
        value={degreeTitle}
        onChangeText={setDegreeTitle}
      />

      <CustomDropdown
        label="Degree Duration *"
        options={['2 Years', '4 Years']}
        selectedValue={degreeDuration}
        onValueChange={setDegreeDuration}
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

      <CustomDropdown
        label="Marks Type *"
        options={['Marks', 'CGPA']}
        selectedValue={marksType}
        onValueChange={handleMarksTypeChange}
      />

      {marksType === 'Marks' && (
        <>
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
        </>
      )}

      {marksType === 'CGPA' && (
        <>
          <CustomTextInput
            label="Total CGPA *"
            value={totalCGPA}
            onChangeText={handleTotalCGPAChange}
            keyboardType="numeric"
          />
          <CustomTextInput
            label="Obtained CGPA *"
            value={obtainedCGPA}
            onChangeText={handleObtainedCGPAChange}
            keyboardType="numeric"
          />
        </>
      )}

      <CustomTextInput
        label="Percentage %"
        value={percentage}
        editable={false}
      />
      
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleDegreeUpload}>
        <Text style={styles.uploadText}>↑ Upload Degree *</Text>
      </TouchableOpacity>
      {degree && (
        <Text style={styles.fileName}>✔ {degree.name}</Text>
      )}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleTranscriptUpload}>
        <Text style={styles.uploadText}>↑ Upload Transcript *</Text>
      </TouchableOpacity>
      {degree && (
        <Text style={styles.fileName}>✔ {transcript.name}</Text>
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
  heading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#d4f8f4',
    paddingVertical: 10,
    borderRadius: 6,
  },
  saveButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  
});

export default BachelorsEducation;
