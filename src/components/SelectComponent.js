import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import categories from '../data/tr_categories.json';

const SelectComponent = ({value, setValue, data, placeholder}) => {
  return (
    <SelectDropdown
      defaultValue={value}
      data={data}
      onSelect={item => {
        setValue(item.id);
      }}
      buttonTextAfterSelection={selectedItem => {
        return selectedItem.name;
      }}
      rowTextForSelection={item => {
        return item.name;
      }}
      defaultButtonText={placeholder}
      buttonStyle={styles.dropdownBtnStyle}
      buttonTextStyle={styles.dropdownBtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <FontAwesome
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            color={'gray'}
            size={16}
          />
        );
      }}
      dropdownIconPosition={'right'}
      rowStyle={styles.dropdownRowStyle}
      rowTextStyle={styles.dropdownRowTxtStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 25,
  },
  dropdownBtnTxtStyle: {
    color: 'gray',
    textAlign: 'left',
  },
  dropdownRowStyle: {
    backgroundColor: 'white',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: {
    color: 'gray',
    textAlign: 'left',
  },
});

export default SelectComponent;
