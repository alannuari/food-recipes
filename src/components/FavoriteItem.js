import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import complexities from '../data/tr_complexities.json';

const FavoriteItem = ({
  id,
  title,
  imageUrl,
  complexity,
  duration,
  navigation,
}) => {
  const pressHandler = () => {
    navigation.navigate('Details', id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler} style={styles.placeItem}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.duration}>
              {duration} minutes ⬤{' '}
              {complexities.data.find(item => item.id === complexity)?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeItem: {
    marginVertical: 5,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
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
  duration: {
    fontSize: 12,
  },
  complexity: {
    paddingHorizontal: 8,
    backgroundColor: 'gray',
    color: 'white',
  },
});

export default FavoriteItem;
