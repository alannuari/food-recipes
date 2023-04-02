import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
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
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://www.kindpng.com/picc/b/136/1369892.png'}}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.identity}>
          <Text style={styles.name}>Dummy Name</Text>
          <Text style={styles.bio}>No Bio</Text>
          <Text style={styles.email}>email : {user.email}</Text>
        </View>
      </View>
      <Text style={styles.text}>Information</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Favorite</Text>
        <Text style={styles.cardContent}>20</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Recipe Post</Text>
        <Text style={styles.cardContent}>10</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  info: {
    backgroundColor: '#e1e1e1',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
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
  identity: {
    marginVertical: 20,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  bio: {
    color: '#AEB5BC',
    marginVertical: 5,
  },
  email: {
    marginVertical: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
    paddingVertical: 15,
  },
  cardTitle: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfileScreen;
