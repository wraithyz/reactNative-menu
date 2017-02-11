import React, { Component, PropTypes } from 'react';
import { View, Text, Navigator, ToolbarAndroid, TouchableHighlight , BackAndroid, Picker} from 'react-native';

import SettingsList from 'react-native-settings-list';

import styles from '../styles/RestaurantPageStyle';

export default class Settings extends Component {

  constructor(props: Object): void {
    super(props);
    this.state = {
      university: this.props.university,
      lang: this.props.lang,
      theme: this.props.theme,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backButtonHandler.bind(this));
  }

  componentWillUnMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backButtonHandler.bind(this));
  }

  backButtonHandler() {
    if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
      this.props.route.callback(this.state);
      this.props.navigator.pop();
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.settingsContainer}>
        <ToolbarAndroid
          style={styles.settingsToolbar}>
          <Text
            style={styles.settingsMenuTitle}>Asetukset</Text>
        </ToolbarAndroid>
        <Text
          style={styles.settingsHeader}>
          Yleiset
        </Text>
        <Text
          style={styles.settingHeader}>
          Oletus yliopisto</Text>
        <Picker
          selectedValue={this.state.university}
          style={styles.settingsPicker}
          onValueChange={(uni) => this.setState({university: uni})}>
          <Picker.Item label="Tay" value="TayPage"/>
          <Picker.Item label="TTY" value="TtyPage"/>
        </Picker>
        <Text
          style={styles.settingHeader}>
          Kieli</Text>
        <Picker
          selectedValue={this.state.lang}
          style={styles.settingsPicker}
          onValueChange={(lang) => this.setState({lang: lang})}>
          <Picker.Item label="Suomi" value="fi"/>
          <Picker.Item label="English" value="eng"/>
        </Picker>
        <Text
          style={styles.settingHeader}>
          Teema</Text>
        <Picker
          selectedValue={this.state.theme}
          style={styles.settingsPicker}
          onValueChange={(theme) => this.setState({theme: theme})}>
          <Picker.Item label="Dark" value="dark"/>
          <Picker.Item label="White" value="white"/>
        </Picker>
      </View>
    )
  }
}
