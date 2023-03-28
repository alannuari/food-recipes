import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import Routes from './src/navigations/Routes';
import {AuthProvider} from './src/navigations/AuthProvider';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
}
