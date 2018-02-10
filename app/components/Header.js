import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  BackAndroid
} from 'react-native';
import PropTypes from 'prop-types';

import ProfileIcon from '../images/profile.png';
import BackIcon from '../images/back-arrow.png';

import Meteor from 'react-native-meteor';
import { NavigationActions } from 'react-navigation';

export default class Header extends Component<{}> {
  render() {
    const { headerText, showBack } = this.props;
    return (
      <View style={styles.header}>
        <StatusBar translucent barStyle="light-content" />
        <View style={styles.buttons}>
          {this.renderBackButton()}
          {this.renderEditButton()}
        </View>
        <View style={styles.main}>
          <Text style={styles.headerText}>{headerText}</Text>
          {this.renderProfileIcon()}
        </View>
      </View>
    );
  }

  renderBackButton() {
    return this.props.showBack ? (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => this.onBackButtonPressed()}
      >
        <Image source={BackIcon} style={styles.backButtonIcon} />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    ) : null;
  }

  renderEditButton() {
    if (this.props.showEdit) {
      if (this.props.isEditing) {
        return (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.toggleEditing()}
          >
            <Text style={[styles.buttonText, { fontWeight: '700' }]}>Done</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.toggleEditing()}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        );
      }
    }
  }

  renderProfileIcon() {
    return this.props.showProfile ? (
      <TouchableOpacity onPress={() => this.onProfilePressed()}>
        <Image
          source={ProfileIcon}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ) : null;
  }

  onBackButtonPressed() {
    this.props.navigation.goBack();
  }

  onProfilePressed() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Profile',
      params: {}
    });

    this.props.navigation.dispatch(navigateAction);
  }
}

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  showEdit: PropTypes.bool,
  showProfile: PropTypes.bool,
  isEditing: PropTypes.bool,
  toggleEditing: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#014F8F',
    height: '20%',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white'
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  main: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileIcon: {
    width: 31,
    height: 31
  },
  headerRow: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  buttonText: {
    fontSize: 17,
    color: 'white'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  backButtonIcon: {
    width: 12,
    height: 21,
    marginRight: 5
  }
});
