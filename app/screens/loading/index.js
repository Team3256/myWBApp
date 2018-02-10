import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: ''
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
      this.setState({ isConnected: isConnected ? 'online' : 'offline' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>{this.props.loadingText}</Text>
        <Text>{this.state.isConnected}</Text>
      </View>
    );
  }
}

Loading.propTypes = {
  loadingText: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
