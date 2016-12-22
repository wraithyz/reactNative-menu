import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux';
import { fetchTayMenu } from '../../actions/tayActions';
import RestaurantView from '../../components/RestaurantView';
import DayView from '../../components/DayView';

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
    let menu;
    if (this.props.tay.fetched) {
      menu = this.props.tay.menu;
    }
    return (
      <ScrollableTabView initialPage={today}>
        <ScrollView tabLabel="Ma">
          <DayView
            menu={menu}
            day={'monday'}
          />
        </ScrollView>
        <ScrollView tabLabel="Ti">
          <DayView
            menu={menu}
            day={'tuesday'}
          />
        </ScrollView>
        <ScrollView tabLabel="Ke">
          <DayView
            menu={menu}
            day={'wednesday'}
          />
        </ScrollView>
        <ScrollView tabLabel="To">
          <DayView
            menu={menu}
            day={'thursday'}
          />
        </ScrollView>
        <ScrollView tabLabel="Pe">
          <DayView
            menu={menu}
            day={'friday'}
          />
        </ScrollView>
        <ScrollView tabLabel="La">
          <DayView
            menu={menu}
            day={'saturday'}
          />
        </ScrollView>
      </ScrollableTabView>
    )
  }

  renderRow(data, today) {
    console.log('got called');
    console.log(data);
    if (data.menu) {
      console.log(today);
      const today = Math.abs(new Date().getDay() - 1);
      const day = days[today];
      if (data.menu.day) {
        console.log(day + ' exists');
        return (
          <RestaurantView
            restaurant={data.restaurant}
            menu={data.menu.day}
            day={today}
          />
        )
      } else {
        console.log(day + ' does not exist');
      }
    }
    return null;
  }
}

export default connect((state) => state, {
  fetchTayMenu
})(Tay);
