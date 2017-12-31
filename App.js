import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.22

import Login from './App/Components/Login';
import Profile from './App/Components/Profile';


const Application = StackNavigator({
  Home: { screen: Login },
  
},
{
  navigationOptions: {
    header: false,
  }
});

export default class App extends Component {
  render() {
    return (
      <Application />
    );
  }
}

