// components/StepHeader.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const StepHeader = ({
  steps = [],
  currentStep = 0,
  title,
  subtitle,
  onClose,
}) => {
  return (
    <View style={styles.card}>
      {/* Top bar */}
      <View style={styles.topRow}>
        <Text style={styles.company}>Company Name</Text>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#444" />
        </TouchableOpacity>
      </View>

      {/* Progress dots */}
      <View style={styles.progressRow}>
        {steps.map((_, i) => (
          <View key={i} style={styles.dotContainer}>
            <View
              style={[
                styles.dot,
                i === currentStep ? styles.dotActive : styles.dotInactive,
              ]}
            />
            {i < steps.length - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>

      {/* Title / Subtitle */}
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 10,
    padding: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: '#007AFF',
  },
  dotInactive: {
    backgroundColor: '#D3D3D3',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
});

export default StepHeader;
