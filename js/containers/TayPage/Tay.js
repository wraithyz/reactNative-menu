import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux';
import { fetchTayMenu } from '../../actions/tayActions';
import RestaurantView from '../../components/RestaurantView';

class Tay extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Loading...'
      ])
    };
  }

  componentWillMount() {
    this.props.fetchTayMenu();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tay.fetched) {
      if (nextProps.tay !== this.props.tay) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.tay.menu)
        });
      }
    }
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
      />
    );
  }
  renderScene(route, navigator) {
    const today = Math.abs(new Date().getDay() - 1);
    return (
      <ScrollableTabView initialPage={today}>
        <View tabLabel="Ma" style={{flex:1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
        <Text tabLabel="Ti">More food</Text>
        <Text tabLabel="Ke">{this.props.tay.fetched}</Text>
        <Text tabLabel="To">EVEN more food</Text>
          <View tabLabel="Pe" style={{flex:1}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
        <Text tabLabel="La">No more pls</Text>
      </ScrollableTabView>
    )
  }

  renderRow(data) {
    if (data.menu) {
      const today = Math.abs(new Date().getDay() - 1);
      return (
        <RestaurantView
          restaurant={data.restaurant}
          menu={data.menu}
          day={today}
        />
      )
    }
    return null;
  }
}

export default connect((state) => state, {
  fetchTayMenu
})(Tay);
