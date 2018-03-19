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

import StartIcon from '../images/start.png';
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

  render() {
    const { responsibility, startTask, runningTask, stopTask } = this.props;
    const taskBox = runningTask
      ? [styles.taskBox, styles.disabledTaskBox]
      : styles.taskBox;
    const taskText = runningTask
      ? [styles.taskText, styles.disabledTaskText]
      : styles.taskText;
    const isRunningTask =
      runningTask && responsibility._id == runningTask.responsibilityId;
    this.shouldStartTime();
    return (
      <View>
        <View
          style={isRunningTask ? [taskBox, styles.runningTaskBox] : taskBox}
        >
          <Text style={isRunningTask ? styles.runningTaskText : taskText}>
            {responsibility.responsibilityText}
            {isRunningTask && (
              <Text style={styles.timeText}> {this.state.timer} Elapsed</Text>
            )}
          </Text>
          {runningTask ? null : (
            <TouchableOpacity
              onPress={() => startTask(responsibility)}
              disabled={runningTask != null}
              style={styles.touchButton}
            >
              <Image
                style={styles.taskStartIcon}
                source={StartIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {isRunningTask && (
            <TouchableOpacity
              onPress={() => stopTask(runningTask)}
              style={styles.touchButton}
            >
              <Image
                style={styles.taskStartIcon}
                source={StopIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  shouldStartTime() {
    if (!this.props.runningTask) {
      if (this.state.timerStarted) {
        clearInterval(this.state.interval);
        this.setState({ timerStarted: false });
      }
      return;
    }

    if (
      this.props.responsibility._id ==
        this.props.runningTask.responsibilityId &&
      !this.state.timerStarted
    ) {
      this.startTime();
    }
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
}

TaskBox.propTypes = {
  responsibility: PropTypes.object.isRequired,
  startTask: PropTypes.func.isRequired,
  runningTask: PropTypes.object
};

const styles = StyleSheet.create({
  taskBox: {
    backgroundColor: '#8DA8B5',
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginRight: 10,
    paddingRight: 0,
    paddingLeft: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  runningTaskBox: {
    backgroundColor: '#28DB41'
  },
  disabledTaskBox: {
    backgroundColor: '#DFE0E6'
  },
  taskStartIcon: {
    width: 18,
    height: 20
  },
  taskStopIcon: {
    width: 33,
    height: 38,
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center'
  },
  touchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: '100%'
  },
  taskText: {
    color: 'white',
    fontSize: 17,
    maxWidth: 500,
    fontWeight: '600'
  },
  runningTaskText: {
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
  },
  disabledTaskText: {
    color: '#383940'
  }
});
