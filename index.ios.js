/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

var Login = require('./src/login');
var ListOfData = require('./src/list');

import {Actions, Scene, Router} from 'react-native-router-flux';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} onRight={ () => Actions.list() } rightTitle="Add" title="DASHBOARD" initial={true}/>
    <Scene key="list" userWallet="1GyKjXhve6Qqmyd8ziURHu8eybsQ1beC8v" component={ListOfData} title="LIST"/>
  </Scene>
);

class NH extends React.Component {

  render() {
    return <Router scenes={scenes}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NH', () => NH);
