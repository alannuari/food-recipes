import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {useSelector} from 'react-redux';
import AddRecipeScreen from '../screens/AddRecipeScreen';

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  const {
    data: {recipes},
  } = useSelector(item => item.category);
  const favLength = recipes?.filter(item => item.isFavorite).length;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Add Recipe') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Category List'}}
      />
      <Tab.Screen name="Add Recipe" component={AddRecipeScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={favLength > 0 ? {tabBarBadge: favLength} : false}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ButtomTab;
