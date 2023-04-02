import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SkeletonFavorite = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.placeitem}>
        <Text style={styles.image}></Text>
        <View style={styles.infoContainer}>
          <Text style={styles.title}></Text>
          <Text style={styles.duration}></Text>
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
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#e1e1e1',
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 8,
    height: 14,
    borderRadius: 7,
    width: 100,
    backgroundColor: '#e1e1e1',
  },
  duration: {
    height: 10,
    borderRadius: 7,
    width: 120,
    backgroundColor: '#e1e1e1',
  },
});

export default SkeletonFavorite;
