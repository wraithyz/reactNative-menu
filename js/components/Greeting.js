import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class Greeting extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James'
      ])
    };
  }
  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={{width: 200, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 50, backgroundColor: 'steelblue'}} />
        <View style={{width: 200, height: 50, backgroundColor: 'powderblue'}} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});
<View tabLabel="Ma" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'monday'}
  />
</View>
<View tabLabel="Ti" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'tuesday'}
  />
</View>
<View tabLabel="Ke" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'wednesday'}
  />
</View>
<View tabLabel="To" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'thursday'}
  />
</View>
<View tabLabel="Pe" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'friday'}
  />
</View>
<View tabLabel="La" style={{flex:1}}>
  <DayView
    dataSource={this.state.dataSource}
    day={'saturday'}
  />
</View>
