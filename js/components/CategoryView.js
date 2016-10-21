import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './styles/RestaurantViewStyle';
import CourseView from './CourseView';

export default class CategoryView extends Component {
  render() {
    let courses;
    if (this.props.courses) {
      courses = this.props.courses.map(course =>
        <CourseView
          name={course.name}
          key={course.name}
        />
      );
    }
    return (
      <View>
        <Text
          style={styles.categoryName}>{this.props.category}
        </Text>
        {courses}
      </View>
    )
  }
}
