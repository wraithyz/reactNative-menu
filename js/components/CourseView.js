import React from 'react';
import { Text } from 'react-native';

import styles from './styles/RestaurantViewStyle';

export default function CourseView(props) {
  return (
    <Text style={styles.course}>{props.name}</Text>
  )
}
CourseView.propTypes = {
  name: React.PropTypes.string.isRequired
};
