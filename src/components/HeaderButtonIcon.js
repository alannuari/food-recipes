import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderButtonIcon = props => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

export default HeaderButtonIcon;
