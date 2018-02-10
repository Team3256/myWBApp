import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor from 'react-native-meteor';

export default class Profile extends Component<{}> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    mode: 'modal'
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerName}>Profile</Text>
            <TouchableOpacity>
              <Text style={styles.headerName}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#014F8F',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  inner: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerName: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white'
  },
  cancelButton: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'center'
  }
});
