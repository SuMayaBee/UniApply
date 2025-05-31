import React from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import CustomCard from '../components/CustomCard';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({navigation}) => {
  const userName = 'Faiqa Iqbal';
  const applicationStatus = 'Pending';

  const getStatusStyle = () => {
    switch (applicationStatus) {
      case 'Accepted':
        return {color: '#2E7D32', backgroundColor: '#E8F5E9'};
      case 'Rejected':
        return {color: '#D32F2F', backgroundColor: '#FFEBEE'};
      default:
        return {color: '#F9A825', backgroundColor: '#FFF3E0'};
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome */}
        <Text style={styles.welcomeText}>Welcome, {userName}! 🎓</Text>

        {/* Status Card */}
        <CustomCard
          title="Application Status"
          description={`Your application is ${applicationStatus.toLowerCase()}.`}
          status={applicationStatus}
          style={[styles.statusCard, getStatusStyle()]}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {[
            {title: 'Apply Now', screen: 'Application'},
            {title: 'Go to Profile', screen: 'Profile'},
            {title: 'Check Deadlines', screen: 'CheckDeadline'},
          ].map(btn => (
            <CustomButton
              key={btn.screen}
              title={btn.title}
              onPress={() => navigation.navigate(btn.screen)}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          ))}
        </View>

        {/* Notice */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            📢 Admission Deadline: March 30, 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFDDE1',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  statusCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#4ECDC4',
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noticeBox: {
    marginTop: 30,
    backgroundColor: '#FFF3CD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  noticeText: {
    color: '#856404',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
