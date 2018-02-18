import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBarww
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor from 'react-native-meteor';
import Divider from '../../components/Divider';
import Button from '../../components/Button';

export default class Profile extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      editing: false
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

  toggleEdit() {
    if (this.state.editing) {
      Alert.alert('Saved', 'Your profile information has been saved.', [
        {
          text: 'OK'
        }
      ]);
      Meteor.call('users.updateCurrentUser', this.state.user, e => {
        console.log(e);
      });
    }

    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { user, editing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerName}>Profile</Text>
            <Button
              text={editing ? 'Done' : 'Edit'}
              textStyle={styles.headerName}
              onPress={() => this.toggleEdit()}
            />
          </View>
        </View>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture} />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>First Name</Text>
            <Text style={styles.rowContent}>{this.state.user.firstName}</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Last Name</Text>
            <Text style={styles.rowContent}>{this.state.user.lastName}</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Backup Email</Text>
            <TextInput
              value={this.state.user.backupEmail}
              editable={editing}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              onChangeText={text =>
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    backupEmail: text
                  }
                }))
              }
              style={[styles.rowContent, styles.textInput]}
            />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Home Phone</Text>
            <TextInput
              value={this.state.user.studentPhone}
              editable={editing}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              onChangeText={text =>
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    studentPhone: text
                  }
                }))
              }
              style={[styles.rowContent, styles.textInput]}
            />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Cell Phone</Text>
            <TextInput
              value={this.state.user.studentCellPhone}
              editable={editing}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
              onChangeText={text =>
                this.setState(prevState => ({
                  user: {
                    ...prevState.user,
                    studentCellPhone: text
                  }
                }))
              }
              style={[styles.rowContent, styles.textInput]}
            />
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Role</Text>
            <Text style={styles.rowContent}>{this.state.user.role}</Text>
          </View>
          <Divider />
          <Button
            style={styles.logout}
            textStyle={styles.logoutText}
            text="Log Out"
            onPress={() => this.warnLogout()}
          />
        </ScrollView>
      </View>
    );
  }

  warnLogout() {
    Alert.alert('Log Out', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        onPress: () => Meteor.logout()
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ]);
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
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600'
  },
  rowContent: {
    fontSize: 15,
    color: '#014F8F',
    width: '70%',
    textAlign: 'right'
  },
  textInput: {
    height: 25,
    padding: 5
  },
  spacer: {
    width: '100%',
    height: 10
  },
  logout: {
    width: '100%',
    height: 45,
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: '#C91833',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutText: {
    fontSize: 17,
    color: 'white'
  }
});
