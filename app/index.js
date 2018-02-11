import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Loading from './screens/loading';
import { AuthStack, Tabs } from './config/routes';

import PropTypes from 'prop-types';
import Meteor, { createContainer } from 'react-native-meteor';
import codePush from 'react-native-code-push';

Meteor.connect('ws://10.78.16.218:3000/websocket');

class App extends Component<{}> {
  render() {
    const { status, user, loggingIn } = this.props;

    if (!status.connected) {
      return <Loading loadingText="Connecting..." />;
    }

    if (status.connected && !user) {
      return <AuthStack />;
    }

    if (status.connected && user) {
      return <Tabs />;
    }
  }
}

App.propTypes = {
  status: PropTypes.object,
  user: PropTypes.object,
  loggingIn: PropTypes.bool
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn()
  };
}, codePush(App));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
