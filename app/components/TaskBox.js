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
  render() {
    const { responsibility, startTask, runningTask } = this.props;
    const taskBox = runningTask
      ? [styles.taskBox, styles.disabledTaskBox]
      : styles.taskBox;
    const taskText = runningTask
      ? [styles.taskText, styles.disabledTaskText]
      : styles.taskText;
    return (
      <View>
        <View style={taskBox}>
          <Text style={taskText}>{responsibility.responsibilityText}</Text>
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
        </View>
      </View>
    );
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
  disabledTaskText: {
    color: '#383940'
  }
});
