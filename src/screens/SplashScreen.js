import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Love from '../assets/images/love.svg';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Love width={'100%'} height={'100%'} />
      </View>
      <Text style={styles.text}>Welcome to Food Recipes</Text>
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
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    height: 300,
    fontSize: 30,
    fontWeight: 'bold',
    width: 230,
  },
});

export default SplashScreen;
