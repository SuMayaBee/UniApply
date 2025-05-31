import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Animated, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FormCompletedScreen = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Form Completed!</Text>
      <Text style={styles.subtitle}>
        You're all done. Thanks for your time!
      </Text>

      <Animated.Image
        source={require('../assets/images/image.png')}
        style={[styles.image, {transform: [{translateY: bounceAnim}]}]}
        resizeMode="contain"
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormCompletedScreen;
