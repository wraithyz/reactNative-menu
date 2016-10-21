import React from 'react';
import { Text } from 'react-native';

export default function CourseView(props) {
  return (
    <Text>{props.name}</Text>
  )
}
CourseView.propTypes = {
  name: React.PropTypes.string.isRequired
};
