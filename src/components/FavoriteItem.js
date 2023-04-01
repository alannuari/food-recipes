import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import complexities from '../data/tr_complexities.json';

const FavoriteItem = ({id, title, imageUrl, complexity, navigation}) => {
  const pressHandler = () => {
    navigation.navigate('Details', id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler} style={styles.placeitem}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.complexity}>
            {complexities.data.find(item => item.id === complexity)?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeitem: {
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    marginLeft: 25,
    width: 250,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  complexity: {
    fontSize: 18,
    paddingHorizontal: 8,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 10,
  },
});

export default FavoriteItem;
