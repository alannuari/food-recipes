import React from 'react';
import {View, Text} from 'react-native';

const NotFoundScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Sorry, data is not found!
      </Text>
    </View>
  );
};

export default NotFoundScreen;
