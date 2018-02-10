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

import AddIcon from '../images/add.png';

export default class AddTaskBox extends Component<{}> {
  render() {
    const { onPress } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.taskBox} onPress={() => onPress()}>
          <Image
            style={styles.taskStartIcon}
            source={AddIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.taskText}>Add Responsibility</Text>
      </View>
    );
  }
}

AddTaskBox.propTypes = {
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  taskBox: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    width: 130,
    height: 130,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#DFE0E6'
  },
  taskStartIcon: {
    width: 33,
    height: 38
  },
  taskText: {
    fontSize: 14,
    marginTop: 10
  }
});
