import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeModules } from 'react-native';
import NoConnection from './screens/NoConnection';
import { AuthStack, Tabs } from './config/routes';

import PropTypes from 'prop-types';
import Meteor, { createContainer } from 'react-native-meteor';
import codePush from 'react-native-code-push';
import { ServerIP } from './config/server';

Meteor.connect('wss://' + ServerIP + '/websocket');

class App extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, user, loggingIn } = this.props;

    if (!user) {
      return (
        <View style={{ width: '100%', height: '100%' }}>
          {this.renderNoConnection(status.connected)}
          <AuthStack />
        </View>
      );
    }

    return (
      <View style={{ width: '100%', height: '100%' }}>
        {this.renderNoConnection(status.connected)}
        <Tabs />
      </View>
    );
  }

  renderNoConnection(connected) {
    if (!connected) {
      return <NoConnection connection={connected} />;
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
