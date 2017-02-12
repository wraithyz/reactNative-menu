import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  Picker,
  AsyncStorage
} from 'react-native';

import moment from 'moment';

import Tay from './TayPage/Tay';
import Settings from './Settings/Settings';

import styles from './styles/RestaurantPageStyle';

export default class Layout extends Component {

  constructor(props: Object): void {
    super(props);
    this.state = {
      university: this.props.university,
      lang: this.props.lang,
      theme: this.props.theme,
      page: 'menu'
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: this.state.page, index: 0}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.id) {
      if (route.id === 'settings') {
        return (
          <Settings
            navigator={navigator}
            route={route}
            university={this.state.university}
            lang={this.state.lang}
            theme={this.state.theme}
            />
        );
      }
      else {
        const week = `Viikko ${moment().format('W')} (${moment().startOf('isoweek').format('DD/MM/YYYY')} - ${moment().endOf('isoweek').format('DD/MM/YYYY')})`;
        return (
          <View style={styles.containerToolbar}>
            <ToolbarAndroid
              style={styles.toolbar}
              actions={[{title: 'Settings'}]}
              onActionSelected={(pos) => this.onActionSelected(pos, navigator)}>
              <Picker
                selectedValue={this.state.university}
                onValueChange={(uni) => this.setState({university: uni})}
                style={styles.menuTitle}>
                <Picker.Item label="Tay" value="TayPage" />
                <Picker.Item label="TTY" value="TtyPage" />
              </Picker>
              <Text style={styles.menuSubtitle}>{week}</Text>
            </ToolbarAndroid>
            <Tay
              uni={this.state.university}
              navigator={navigator} />
          </View>
        );
      }
    }
  }

  readSettings = (args)  => {
    AsyncStorage.multiSet([['@Settings:university', args.university], ['@Settings:theme', args.theme], ['@Settings:lang', args.lang]]);
    this.setState({
      university: args.university,
      theme: args.theme,
      lang: args.lang,
      page: 'menu',
    });
  }

  onActionSelected(position, navigator) {
    if (this.state.page !== 'settings') {
      navigator.push({
        id: 'settings',
        index: 1,
        callback: this.readSettings,
      });
    }
  }
}
