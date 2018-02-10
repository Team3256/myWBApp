import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

export default class CreateNewResponsibility extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>ye</Text>
      </View>
    );
  }
}

CreateNewResponsibility.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
