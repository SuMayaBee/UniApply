import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/CustomButton';

const DegreePreference = () => {
  const navigation = useNavigation();
  const [expandedFaculty, setExpandedFaculty] = useState(null);
  const [selectedDegrees, setSelectedDegrees] = useState({});

  const faculties = [
    {
      name: 'Faculty of Science',
      degrees: ['BS Computer Science', 'BS Artificial Intelligence'],
    },
    {
      name: 'Faculty of Engineering',
      degrees: [
        'BS Computer Engineering',
        'BS Electrical Engineering',
        'BS Software Engineering',
      ],
    },
    {
      name: 'Faculty of Business and Management Science',
      degrees: ['BS Management & Technology'],
    },
    {
      name: 'Faculty of Humanities & Social Sciences',
      degrees: ['BS Economics With Data Science'],
    },
  ];

  const handleFacultyPress = facultyName => {
    setExpandedFaculty(expandedFaculty === facultyName ? null : facultyName);
  };

  const handleDegreeToggle = degree => {
    setSelectedDegrees(prev => ({
      ...prev,
      [degree]: !prev[degree],
    }));
  };

  const handleNext = () => {
    navigation.navigate('Test'); // Change this to your actual next screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Degree Preference</Text>

      {faculties.map((faculty, index) => (
        <View key={index} style={styles.facultyContainer}>
          <TouchableOpacity
            style={styles.facultyBox}
            onPress={() => handleFacultyPress(faculty.name)}>
            <Text style={styles.facultyText}>{faculty.name}</Text>
          </TouchableOpacity>

          {expandedFaculty === faculty.name && (
            <View style={styles.degreesContainer}>
              {faculty.degrees.map((degree, idx) => (
                <View key={idx} style={styles.checkboxContainer}>
                  <CheckBox
                    value={!!selectedDegrees[degree]}
                    onValueChange={() => handleDegreeToggle(degree)}
                    tintColors={{true: '#4a90e2', false: '#ccc'}}
                  />
                  <Text style={styles.degreeText}>{degree}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <View style={styles.saveButton}>
        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  facultyContainer: {
    marginBottom: 20,
  },
  facultyBox: {
    backgroundColor: '#F0F0F0',
    padding: 18,
    borderRadius: 10,
    elevation: 2,
  },
  facultyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  degreesContainer: {
    marginTop: 10,
    paddingLeft: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  degreeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default DegreePreference;
