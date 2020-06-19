
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import TaskList from './src/screens/TaskList';
import Auth from './src/screens/Auth';
const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Auth />    
    </>
  );
};

export default App;
