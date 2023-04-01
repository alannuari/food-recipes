import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {useSelector} from 'react-redux';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        top: -18,
        color: 'white',
        width: 60,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 30,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const ButtomTab = () => {
  const {data: recipes} = useSelector(item => item.favorite);
  const favLength = recipes?.filter(item => item.isFavorite).length;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          borderTopEndRadius: 15,
          borderTopLeftRadius: 15,
          height: 65,
        },
        tabBarIcon: ({focused, color, size}) => {
          size = 30;
          color = 'gray';
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Add Recipe') {
            iconName = 'plus';
          } else if (route.name === 'My Recipes') {
            iconName = focused
              ? 'book-open-page-variant'
              : 'book-open-page-variant-outline';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={route.name === 'Add Recipe' ? 45 : size}
              color={route.name === 'Add Recipe' ? 'white' : color}
            />
          );
        },
        tabBarActiveTintColor: route.name === 'Add Recipe' ? 'white' : 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="My Recipes" component={MyRecipesScreen} />
      <Tab.Screen
        name="Add Recipe"
        component={AddRecipeScreen}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ButtomTab;
