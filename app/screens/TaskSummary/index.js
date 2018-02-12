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

import ProgressCircle from 'react-native-progress-circle';
import Header from '../../components/Header';
import Clock from '../../images/clock.png';

export default class TaskSummary extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      taskHours: 0
    };
  }

  componentWillMount() {
    Meteor.call('tasks.getTotalHours', (e, hours) => {
      this.setState({ taskHours: hours });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText="Summary"
          showBack={true}
          navigation={this.props.navigation}
        />
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.progressContainer}>
            <Image
              source={Clock}
              style={styles.clockStyle}
              resizeMode="contain"
            />
            <View style={styles.clockTextContainer}>
              <Text style={styles.clockTextHours}>{this.state.taskHours}</Text>
              <Text style={styles.clockText}>hrs</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>General Tasks</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <ProgressCircle
              percent={30}
              radius={80}
              borderWidth={12}
              color="#05CF00"
              shadowColor="#DFE0E6"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 47 }}>{'30%'}</Text>
            </ProgressCircle>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Outreach</Text>
              <Text style={styles.subtitle}>8 hrs</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <ProgressCircle
              percent={30}
              radius={80}
              borderWidth={12}
              color="#2299FF"
              shadowColor="#DFE0E6"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 47 }}>{'30%'}</Text>
            </ProgressCircle>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Cleaning</Text>
              <Text style={styles.subtitle}>8 hrs</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    backgroundColor: 'white'
  },
  progressContainer: {
    width: '100%',
    height: 'auto',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clockStyle: {
    width: 163,
    height: 163
  },
  clockTextContainer: {
    position: 'absolute',
    width: 125,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    left: 40
  },
  clockTextHours: {
    fontSize: 47,
    fontWeight: '600'
  },
  clockText: {
    fontSize: 25,
    bottom: 6,
    fontWeight: '500'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black'
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '300',
    color: 'black'
  }
});
