import React, {useState, useEffect, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(AuthContext);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
