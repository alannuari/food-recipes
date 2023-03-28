import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SkeletonItem = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.image}></Text>
          <Text style={styles.title}></Text>
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
    backgroundColor: '#e1e1e1',
  },
  title: {
    height: 15,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: 'inherit',
    borderRadius: 10,
    backgroundColor: '#e1e1e1',
  },
});

export default SkeletonItem;
