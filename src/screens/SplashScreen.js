import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Cook from '../assets/images/cook.svg';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Cook width={'100%'} height={'100%'} />
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Welcome to Food Recipes</Text>
        <Text style={styles.subText}>
          Explore recipes and enjoy your cooking!
        </Text>
        <ActivityIndicator size="large" color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
  },
  title: {
    height: 300,
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    width: 230,
  },
  subText: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SplashScreen;
