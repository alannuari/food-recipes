import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {AuthContext} from '../navigations/AuthProvider';
import HeaderButtonIcon from '../components/HeaderButtonIcon';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const logoutHandler = () => {
    Alert.alert('Konfirmation', 'Apakah anda ingin keluar ?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: logout,
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonIcon}>
          <Item
            title="favorite"
            iconName={'log-out-outline'}
            onPress={logoutHandler}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://www.kindpng.com/picc/b/136/1369892.png'}}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Alan Nuari</Text>
        <Text style={styles.work}>Frontend Developer</Text>
      </View>
      <Text style={styles.info}>Information</Text>
      <View style={styles.recentItem}>
        <Text>~ email : {user.email}</Text>
        <Text>~ country : Indonesia</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    marginHorizontal: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  infoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  work: {
    color: '#AEB5BC',
    fontSize: 18,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 35,
  },
  recentItem: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 35,
  },
});

export default ProfileScreen;
