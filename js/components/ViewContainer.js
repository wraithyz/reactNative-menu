import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


class ViewContainer extends Component {
  render() {
    return {
      <View style={styles.viewContainer}>
        {this.props.children}
      </View>
    }
  }
}

const styles = React.StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  }
});

module.exports = ViewContainer;
