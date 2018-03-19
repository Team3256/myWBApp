import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeModules } from 'react-native';
import NoConnection from './screens/NoConnection';
import { AuthStack, Tabs } from './config/routes';

import PropTypes from 'prop-types';
import Meteor, { createContainer } from 'react-native-meteor';
import codePush from 'react-native-code-push';
import { ServerIP } from './config/server';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

Meteor.connect('ws://' + ServerIP + '/websocket');

class App extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, user, loggingIn } = this.props;

    return (
      <View style={{ width: '100%', height: '100%' }}>
        {!status.connected && <NoConnection connection={status.connected} />}
        {user ? <Tabs /> : <AuthStack />}
      </View>
    );
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
}, codePush(codePushOptions)(App));

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
