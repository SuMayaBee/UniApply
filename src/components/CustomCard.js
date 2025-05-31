import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomCard = ({title, description, status}) => {
  return (
    <View style={[styles.card, statusStyles[status] || styles.defaultCard]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {status && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  defaultCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#ccc',
  },
});

// Status Colors
const statusStyles = {
  Pending: {borderLeftColor: '#f39c12'},
  Approved: {borderLeftColor: '#2ecc71'},
  Rejected: {borderLeftColor: '#e74c3c'},
};

export default CustomCard;
