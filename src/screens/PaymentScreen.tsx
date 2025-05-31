import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const PaymentScreen = ({navigation}) => {
  const selectedTests = useSelector(selectSelectedTests);
  const testCount = selectedTests.length;
  const amount = testCount * 500; // 500 per test

  const handlePayment = () => {
    // Implement your payment logic here
    console.log('Processing payment for:', selectedTests);
    console.log('Amount:', amount);
    // After successful payment, you might want to clear the selected tests
    // dispatch(clearTests());
    // navigation.navigate('Confirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Summary</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Number of Tests: {testCount}</Text>
        <Text style={styles.summaryText}>Amount per Test: Rs. 500</Text>
        <View style={styles.divider} />
        <Text style={styles.totalAmount}>Total Amount: Rs. {amount}</Text>
      </View>

      <View style={styles.selectedTestsContainer}>
        <Text style={styles.subHeader}>Selected Tests:</Text>
        {selectedTests.map((test, index) => (
          <Text key={index} style={styles.testItem}>
            {test.name}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2a52be',
  },
  selectedTestsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  payButton: {
    backgroundColor: '#2a52be',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
