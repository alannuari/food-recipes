import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ButtomTab from './ButtomTab';
import RecipeScreen from '../screens/RecipeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Container"
        component={ButtomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{title: 'Recipe List'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: 'Recipe Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
