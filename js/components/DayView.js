
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';

import styles from './styles/RestaurantViewStyle';
import RestaurantView from './RestaurantView';

export default class DayView extends Component {
  render() {
    let menu;
    if (this.props.menu) {
        menu = this.props.menu.map((restaurant, index) =>
          <RestaurantView
            restaurant={restaurant.restaurant}
            menu={restaurant.menu[this.props.day]}
            key={index}
            />
        );
    }
    return (
      <ScrollView style={styles.dayView}>
        {menu}
      </ScrollView>
    )
  }
}
