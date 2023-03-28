import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (email, password) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        loading,
        login: loginHandler,
        register: registerHandler,
        logout: logoutHandler,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
