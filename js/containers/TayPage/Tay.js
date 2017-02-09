import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Navigator,
  ToolbarAndroid
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux';
import { fetchTayMenu } from '../../actions/tayActions';
import { fetchTtyMenu } from '../../actions/ttyActions';
import RestaurantView from '../../components/RestaurantView';
import DayView from '../../components/DayView';
import styles from '../styles/RestaurantPageStyle';

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
    if (this.props.uni)
    {
      if (this.props.uni === 'TayPage' && !this.props.tay.fetched) {
          this.props.fetchTayMenu();
      } else if (this.props.uni === 'TtyPage' && !this.props.tty.fetched) {
        this.props.fetchTtyMenu();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uni === 'TayPage') {
      if (nextProps.tay.fetched) {
        if (nextProps.tay !== this.props.tay) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.tay.menu)
          });
        }
      } else {
        this.props.fetchTayMenu();
      }
    } else if (nextProps.uni === 'TtyPage') {
      if (nextProps.tty.fetched) {
        if (nextProps.tty !== this.props.tty) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.tty.menu)
          });
        }
      } else {
        this.props.fetchTtyMenu();
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
    if (this.props.uni === 'TayPage') {
      if (this.props.tay.fetched) {
        menu = this.props.tay.menu;
      }
    } else if (this.props.uni === 'TtyPage') {
      if (this.props.tty.fetched) {
        menu = this.props.tty.menu;
      }
    }
    return (
      <ScrollableTabView
        initialPage={today}
        style={styles.tabContainer}
        tabBarActiveTextColor={'#FFFFFF'}
        tabBarInactiveTextColor={'#FFFFFF'}
        tabBarTextStyle={{opacity: 1}}
        renderTabBar={()=>
          <ScrollableTabBar
            backgroundColor='#2c333b'/>}>
        <ScrollView
          tabLabel="Ma">
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
  fetchTayMenu,
  fetchTtyMenu
})(Tay);
