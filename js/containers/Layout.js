import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  Picker
} from 'react-native';

import moment from 'moment';

import Tay from './TayPage/Tay';

export default class Layout extends Component {
  state = {
    university: 'Tay'
  };

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'TayPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
  renderScene(route, navigator) {
    if (route.id) {
      const week = `Viikko ${moment().format('W')} (${moment().startOf('isoweek').format('DD/MM/YYYY')} - ${moment().endOf('isoweek').format('DD/MM/YYYY')})`;
      return (
        <View style={styles.containerToolbar}>
          <ToolbarAndroid
            style={styles.toolbar}
            actions={[{title: 'Settings'}]}>
            <Picker
              selectedValue={this.state.university}
              style={styles.menuTitle}
              onValueChange={(uni) => uni !== route.id ? this.changeUni(uni, navigator) : ''}>
              <Picker.Item label="Tay" value="TayPage" />
              <Picker.Item label="TTY" value="TtyPage" />
            </Picker>
            <Text style={styles.menuSubtitle}>{week}</Text>
          </ToolbarAndroid>
          <Tay
            uni={route.id}
            navigator={navigator} />
        </View>
      );
    }
  }

  changeUni(uni, navigator) {
    this.setState({university: uni});
    navigator.push({id: uni});
  }
}

const styles = StyleSheet.create({
  menuTitle: {
    color: '#FFFFFF',
  },
  menuSubtitle: {
    color: '#FFFFFF',
    opacity: 0.7,
    paddingLeft: 10
  },
  containerToolbar: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#303030',
  },
  toolbar: {
    backgroundColor: '#2c333b',
    height: 56
  },
  dropdown: {
    justifyContent: 'flex-start',
    padding: 5
  },
});
