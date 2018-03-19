import React, { Component } from 'react';
import Meteor from 'react-native-meteor';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Timeline from 'react-native-timeline-listview';

export default class MatchResult extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    mode: 'modal'
  });

  render() {
    const match = this.props.navigation.state.params.match;
    const { timeline, data } = match;

    return (
      <View style={styles.container}>
        <Header
          headerText={'Match Result ' + match.matchKey}
          showBack={true}
          navigation={this.props.navigation}
        />
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <Text>Auto:</Text>
            <Text>Crossed Line: {data.auto.crossedLine ? 'YES' : 'NO'}</Text>
            <Text>Disconnected: {data.auto.disconnected ? 'YES' : 'NO'}</Text>
            <Text>Switch: {data.auto.blocksPlaced.switch}</Text>
            <Text>Scale: {data.auto.blocksPlaced.scale}</Text>
            <Text>Exchange: {data.auto.blocksPlaced.exchange}</Text>
            <Text>Dropped: {data.auto.blocksPlaced.dropped}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Teleop:</Text>
            <Text>Parked: {data.teleop.parked ? 'YES' : 'NO'}</Text>
            <Text>Climbed: {data.teleop.climbed ? 'YES' : 'NO'}</Text>
            <Text>Supported: {data.teleop.supported ? 'YES' : 'NO'}</Text>
            <Text>Disconnected: {data.teleop.disconnected ? 'YES' : 'NO'}</Text>
            <Text>Fouls: {data.teleop.fouls}</Text>
            <Text>Switch: {data.teleop.blocksPlaced.switch}</Text>
            <Text>Scale: {data.teleop.blocksPlaced.scale}</Text>
            <Text>Exchange: {data.teleop.blocksPlaced.exchange}</Text>
            <Text>Dropped: {data.teleop.blocksPlaced.dropped}</Text>
          </View>
        </View>
        <View style={styles.timelineContainer}>
          <Timeline data={timeline} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  timelineContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  textContainer: {
    flex: 1
  },
  dataContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});
