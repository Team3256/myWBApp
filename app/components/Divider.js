import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Divider extends Component<{}> {
  render() {
    return <View style={styles.containerDivider} />;
  }
}

Divider.propTypes = {};

const styles = StyleSheet.create({
  containerDivider: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#CBCBCB'
  }
});
