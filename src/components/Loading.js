import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
});

export default Loading;
