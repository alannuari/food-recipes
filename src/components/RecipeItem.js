import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const RecipeItem = ({id, title, imageUrl, navigation}) => {
  const pressHandler = () => {
    navigation.navigate('Details', id);
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
    flex: 1,
    height: 150,
    paddingHorizontal: 5,
    marginVertical: 5,
    maxWidth: '50%',
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

export default RecipeItem;
