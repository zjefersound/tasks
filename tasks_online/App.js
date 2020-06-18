
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import TaskList from './src/screens/TaskList';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TaskList />    
    </>
  );
};

export default App;
