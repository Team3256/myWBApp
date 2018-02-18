import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class ScoutBool extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    const { value } = this.props;
    return (
      <View style={styles.containerScoutBool}>
        <TouchableOpacity
          onPress={() => this.changeFalse()}
          style={!value ? [styles.circle, styles.circleActive] : styles.circle}
        >
          <Text
            style={
              !value
                ? [styles.circleText, styles.circleActiveText]
                : styles.circleText
            }
          >
            NO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.changeTrue()}
          style={value ? [styles.circle, styles.circleActive] : styles.circle}
        >
          <Text
            style={
              value
                ? [styles.circleText, styles.circleActiveText]
                : styles.circleText
            }
          >
            YES
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  changeTrue() {
    this.props.changeValue(true);
  }

  changeFalse() {
    this.props.changeValue(false);
  }
}

ScoutBool.propTypes = {};

const styles = StyleSheet.create({
  containerScoutBool: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  circle: {
    borderRadius: 100,
    borderColor: '#DFE0E6',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45
  },
  circleActive: {
    borderColor: '#014F8F'
  },
  circleText: {
    color: '#DFE0E6',
    fontWeight: '500'
  },
  circleActiveText: {
    color: '#014F8F',
    fontWeight: '500'
  }
});
