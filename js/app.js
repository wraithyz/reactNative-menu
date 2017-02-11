import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Layout from './containers/Layout';
import store from './store';

export default class reactNativeUniFood extends Component {

  constructor(props: Object): void {
    super(props);
    this.state = {
      isLoading: true,
      university: 'TayPage',
      theme: 'dark',
      lang: 'fi',
    };
  }

  componentWillMount() {
    let promises = [
      new Promise((resolve) => {
        AsyncStorage.getItem('@Settings:theme').then((theme) => {
          if (theme === null) {
            AsyncStorage.setItem('@Settings:theme', 'dark').then(() => {
              resolve();
            });
          } else {
            this.setState({theme: theme});
            resolve();
          }
        });
      }),
      new Promise((resolve) => {
        AsyncStorage.getItem('@Settings:university').then((uni) => {
          if (uni === null) {
            AsyncStorage.setItem('@Settings:university', 'TayPage').then(() => {
              resolve();
            });
          } else {
            this.setState({university: uni});
            resolve();
          }
        });
      }),
      new Promise((resolve) => {
        AsyncStorage.getItem('@Settings:lang').then((lang) => {
          if (lang === null) {
            AsyncStorage.setItem('@Settings:lang', 'fi').then(() => {
              resolve();
            });
          } else {
            this.setState({lang: lang});
            resolve();
          }
        });
      })
    ];
    Promise.all(promises).then(values => {
      console.log('ALL DONE');
      this.setState({
        isLoading: false
      });
    })
  }

  render() {
    if (this.state.isLoading) {
      console.log('loading...');
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Provider store={store}>
        <Layout
          theme={this.state.theme}
          lang={this.state.lang}
          university={this.state.university}/>
      </Provider>
    );
  }
}
