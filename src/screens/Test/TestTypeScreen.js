import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TestTypeScreen = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [testDetails, setTestDetails] = useState({});
  const [resultImages, setResultImages] = useState({});

  const navigation = useNavigation();

  const testTypes = [
    {id: 'itu', name: 'ITU Test', requiresDetails: false},
    {id: 'ecat', name: 'ECAT', requiresDetails: true},
    {id: 'usat', name: 'USAT', requiresDetails: true},
    {id: 'nts', name: 'NTS', requiresDetails: true},
  ];

  const handleTestToggle = test => {
    if (selectedTests.some(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));

      const newDetails = {...testDetails};
      delete newDetails[test.id];
      setTestDetails(newDetails);

      const newImages = {...resultImages};
      delete newImages[test.id];
      setResultImages(newImages);
    } else {
      setSelectedTests([...selectedTests, test]);

      setTestDetails({
        ...testDetails,
        [test.id]: {
          testDate: '',
          totalMarks: '',
          testStatus: 'Waiting',
          obtainedMarks: '',
        },
      });
    }
  };

  const handleDetailChange = (testId, field, value) => {
    setTestDetails({
      ...testDetails,
      [testId]: {
        ...testDetails[testId],
        [field]: value,
      },
    });
  };

  const handleUploadResult = testId => {
    console.log(`Upload result image for ${testId}`);
    setResultImages({
      ...resultImages,
      [testId]: 'dummy-image-uri',
    });
  };

  const handleSubmit = () => {
    console.log({
      selectedTests,
      testDetails,
      resultImages,
    });

    // Navigate to FormCompletedScreen
    navigation.navigate('FormCompletedScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select Test Type(s)</Text>

      <View style={styles.testTypeContainer}>
        {testTypes.map(test => (
          <TouchableOpacity
            key={test.id}
            style={[
              styles.testTypeButton,
              selectedTests.some(t => t.id === test.id) &&
                styles.selectedTestType,
            ]}
            onPress={() => handleTestToggle(test)}>
            <Text
              style={[
                styles.testTypeText,
                selectedTests.some(t => t.id === test.id) &&
                  styles.selectedTestTypeText,
              ]}>
              {test.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTests.length > 0 && <View style={styles.divider} />}

      {selectedTests.map(test => (
        <View key={test.id} style={styles.testDetails}>
          <Text style={styles.testName}>{test.name}</Text>

          {test.requiresDetails ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Test Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  value={testDetails[test.id]?.testDate || ''}
                  onChangeText={text =>
                    handleDetailChange(test.id, 'testDate', text)
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Total Marks</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter total marks"
                  keyboardType="numeric"
                  value={testDetails[test.id]?.totalMarks || ''}
                  onChangeText={text =>
                    handleDetailChange(test.id, 'totalMarks', text)
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Test Status</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() =>
                      handleDetailChange(test.id, 'testStatus', 'Waiting')
                    }>
                    <View style={styles.radioCircle}>
                      {testDetails[test.id]?.testStatus === 'Waiting' && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.radioLabel}>Waiting</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() =>
                      handleDetailChange(test.id, 'testStatus', 'Declared')
                    }>
                    <View style={styles.radioCircle}>
                      {testDetails[test.id]?.testStatus === 'Declared' && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={styles.radioLabel}>Declared</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {testDetails[test.id]?.testStatus === 'Declared' && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Obtained Marks</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter obtained marks"
                      keyboardType="numeric"
                      value={testDetails[test.id]?.obtainedMarks || ''}
                      onChangeText={text =>
                        handleDetailChange(test.id, 'obtainedMarks', text)
                      }
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Upload Result</Text>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleUploadResult(test.id)}>
                      <Text style={styles.uploadButtonText}>
                        {resultImages[test.id]
                          ? 'Change Image'
                          : 'Select Image'}
                      </Text>
                    </TouchableOpacity>
                    {resultImages[test.id] && (
                      <View style={styles.imagePreview}>
                        <Image
                          source={{uri: resultImages[test.id]}}
                          style={styles.previewImage}
                        />
                        <Text style={styles.imageText}>
                          Result image selected
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </>
          ) : (
            <Text style={styles.noDetailsText}>
              No additional details required for this test
            </Text>
          )}
        </View>
      ))}

      {selectedTests.length > 0 && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  testTypeContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testTypeButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
  },
  selectedTestType: {
    backgroundColor: '#4a90e2',
  },
  testTypeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedTestTypeText: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  testDetails: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  noDetailsText: {
    color: '#666',
    fontStyle: 'italic',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a90e2',
  },
  radioLabel: {
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  imageText: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TestTypeScreen;
