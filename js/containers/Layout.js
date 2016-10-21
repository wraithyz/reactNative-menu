import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Tay from './TayPage/Tay';

export default class Layout extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ id: 'TayPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
  renderScene(route, navigator) {
    switch(route.id) {
      case 'TayPage':
        return (
          <Tay
            navigator={navigator} />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
