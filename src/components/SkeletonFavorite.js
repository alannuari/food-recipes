import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SkeletonFavorite = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.placeitem}>
        <Text style={styles.image}></Text>
        <View style={styles.infoContainer}>
          <Text style={styles.title}></Text>
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
    backgroundColor: '#e1e1e1',
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    height: 14,
    borderRadius: 7,
    width: 100,
    backgroundColor: '#e1e1e1',
  },
});

export default SkeletonFavorite;
