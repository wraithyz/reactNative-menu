import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './styles/RestaurantViewStyle';
import CategoryView from './CategoryView';

export default class RestaurantView extends Component {
  render() {
    let menu;
    if (this.props.menu) {
      menu = this.props.menu.map((category, index) =>
        <CategoryView
          category={category.category}
          courses={category.courses}
          key={index}
        />
      );
    }
    return (
      <View style={styles.restaurantView}>
        <Text style={styles.restaurantName}>
          {this.props.restaurant}
        </Text>
        {menu}
      </View>
    )
  }
}
