import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const CategoryItem = ({id, title, imageUrl, navigation}) => {
  const pressHandler = () => {
    navigation.navigate('Recipe', id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler}>
        <View style={styles.item}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    paddingHorizontal: 5,
    marginVertical: 5,
    width: width / 2,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 100,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CategoryItem;
