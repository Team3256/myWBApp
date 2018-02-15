import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor from 'react-native-meteor';
import Divider from '../../components/Divider';

export default class Profile extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    mode: 'modal'
  });

  componentWillMount() {
    Meteor.call('users.getCurrentUser', (e, user) => {
      console.log(user[0]);
      this.setState({ user: user[0] });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerName}>Profile</Text>
            <TouchableOpacity onPress={() => Meteor.logout()}>
              <Text style={styles.headerName}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture} />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>First Name</Text>
            <Text>{this.state.user.firstName}</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Last Name</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Backup Email</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Home Phone</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Role</Text>
          </View>
          <Divider />
        </ScrollView>
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
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  profilePictureContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    width: 125,
    height: 125,
    backgroundColor: '#EFEFEF',
    borderRadius: 100
  },
  row: {
    marginTop: 10,
    marginBottom: 10
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600'
  },
  spacer: {
    width: '100%',
    height: 10
  }
});
