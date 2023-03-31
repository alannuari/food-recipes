import React from 'react';
import {Input} from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InputComponent = ({placeholder, name, label, value, setValue}) => {
  return (
    <Input
      placeholder={placeholder}
      label={label}
      value={value}
      onChangeText={val => setValue(val)}
      leftIcon={<FontAwesome name={name} size={20} />}
      containerStyle={{
        paddingHorizontal: 0,
      }}
      style={{
        marginHorizontal: 8,
      }}
    />
  );
};

export default InputComponent;
