import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import StopIcon from '../images/stop.png';

export default class TaskBox extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      timer: '',
      timerStarted: false,
      interval: ''
    };
  }

  componentWillMount() {
    this.startTime();
  }

  render() {
    const { responsibility, stopTask, runningTask } = this.props;
    return (
      <View>
        <View style={styles.taskBox}>
          <View>
            <Text style={styles.taskText}>
              {responsibility.responsibilityText}
            </Text>
            <Text style={styles.timeText}>{this.state.timer} Elapsed</Text>
          </View>
          <TouchableOpacity onPress={() => stopTask(runningTask)}>
            <Image
              style={styles.taskIcon}
              source={StopIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  startTime() {
    this.generateTime(this.props.runningTask.startedAt);
    if (!this.state.timerStarted) {
      this.setState({
        interval: setInterval(() => {
          this.generateTime(this.props.runningTask.startedAt);
        }, 1000),
        timerStarted: true
      });
    }
  }

  generateTime(date) {
    var diff = new Date() - date;
    var hours = Math.floor(diff / 3.6e6);
    var minutes = Math.floor((diff % 3.6e6) / 6e4);
    var seconds = Math.floor((diff % 6e4) / 1000);

    if (hours > 0) {
      this.setState({ timer: `${hours} hrs ${minutes} min` });
    } else {
      this.setState({ timer: `${minutes} min ${seconds}s` });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
}

TaskBox.propTypes = {
  responsibility: PropTypes.object.isRequired,
  stopTask: PropTypes.func.isRequired,
  runningTask: PropTypes.object
};

const styles = StyleSheet.create({
  taskBox: {
    backgroundColor: '#28DB41',
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginRight: 10,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskIcon: {
    width: 18,
    height: 20
  },
  taskText: {
    color: 'white',
    fontSize: 17,
    maxWidth: 500,
    fontWeight: '600',
    marginLeft: -1
  },
  timeText: {
    color: 'white',
    fontSize: 17,
    maxWidth: 500,
    fontWeight: '300'
  }
});
