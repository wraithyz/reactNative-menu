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
        <Picker
          selectedValue={this.state.lang}
          style={styles.settingsPicker}
          onValueChange={(lang) => this.setState({lang: lang})}>
          <Picker.Item label="Kieli: Suomi" value="fi"/>
          <Picker.Item label="Language: English" value="eng"/>
        </Picker>
        <SettingsList
          backgroundColor= '#2c333b'
          style={styles.settingsList}>
          <SettingsList.Header
            headerText='Yleiset'
            headerStyle={{color:'white'}}/>
          <SettingsList.Item
            title='Yliopisto'
            titleInfo={this.props.university}
            backgroundColor='#2c333b'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}>
            </SettingsList.Item>
          <SettingsList.Item
            title='Kieli'
            titleInfo={this.props.lang}
            backgroundColor='#2c333b'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}/>
          <SettingsList.Item
            title='Teema'
            titleInfo={this.props.theme}
            backgroundColor='#2c333b'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}/>
          <SettingsList.Header
            headerText='Tietoja'
            backgroundColor='#2c333b'
            headerStyle={{color:'white', marginTop:50}}/>
          <SettingsList.Item
            title='Tietoja'
            backgroundColor='#2c333b'
            titleInfo='Some Information'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}/>
          <SettingsList.Item
            title='Settings 1'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}
            backgroundColor='#2c333b'/>
          <SettingsList.Item
            title='Settings 2'
            titleStyle={{color:'white'}}
            arrowStyle={{tintColor:'white'}}
            backgroundColor='#2c333b'/>
        </SettingsList>
      </View>
    )
  }
}
