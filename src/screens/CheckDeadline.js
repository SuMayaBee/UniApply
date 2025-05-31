import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const CheckDeadlineScreen = () => {
  // Dummy data for programs and their deadlines
  const programs = [
    {id: '1', name: 'Computer Science', deadline: 'April 15, 2025'},
    {id: '2', name: 'Electrical Engineering', deadline: 'March 30, 2025'},
    {id: '3', name: 'Business Administration', deadline: 'May 10, 2025'},
    {id: '4', name: 'Biotechnology', deadline: 'April 25, 2025'},
    {id: '5', name: 'Psychology', deadline: 'May 5, 2025'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Check Deadlines</Text>
      <FlatList
        data={programs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.programItem}>
            <Text style={styles.programName}>{item.name}</Text>
            <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDDE1',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  programItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Adds shadow effect
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
  },
  deadline: {
    fontSize: 16,
    color: 'red', // You can change this based on date conditions
    marginTop: 5,
  },
});

export default CheckDeadlineScreen;
