import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class ScoutNum extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    const { value } = this.props;
    return (
      <View style={styles.containerScoutNum}>
        <TouchableOpacity
          onPress={() => this.subtract()}
          style={[styles.circle, styles.circleActive]}
        >
          <Text style={[styles.circleText, styles.circleActiveText]}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{value}</Text>
        <TouchableOpacity
          onPress={() => this.add()}
          style={[styles.circle, styles.circleActive]}
        >
          <Text style={[styles.circleText, styles.circleActiveText]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  add() {
    if (this.props.value < 99) {
      this.props.changeValue(this.props.value + 1);
    }
  }

  subtract() {
    if (this.props.value >= 1) {
      this.props.changeValue(this.props.value - 1);
    }
  }
}

ScoutNum.propTypes = {};

const styles = StyleSheet.create({
  containerScoutNum: {
    width: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    fontSize: 28,
    fontWeight: '500',
    bottom: 2
  },
  circleActiveText: {
    color: '#014F8F',
    fontWeight: '500'
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600'
  }
});
