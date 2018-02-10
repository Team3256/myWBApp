import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

export default class Scouting extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText="Scouting"
          showProfile={true}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

Scouting.propTypes = {
  loadingText: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
