
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
        console.log(`hey man its ${this.props.day}`);
        menu = this.props.menu.map((restaurant, index) =>
          <RestaurantView
            restaurant={restaurant.restaurant}
            menu={restaurant.menu[this.props.day]}
            key={index}
            />
        );
    }
    return (
      <ScrollView>
        {menu}
      </ScrollView>
    )
  }
}
