import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import ListViewArrowIcon from '../images/list-view-arrow.png';
import Divider from './Divider';

export default class ListButton extends Component<{}> {
  render() {
    const { onPress, disabled, text, style } = this.props;
    return (
      <TouchableOpacity
        style={[styles.listViewButton, style]}
        onPress={() => onPress()}
        disabled={disabled}
      >
        <View>
          <Divider />
          <View style={styles.innerListViewButton}>
            <Text style={styles.listViewButtonText}>{text}</Text>
            <Image
              style={styles.listViewArrowIcon}
              source={ListViewArrowIcon}
              resizeMode="contain"
            />
          </View>
          <Divider />
        </View>
      </TouchableOpacity>
    );
  }
}

ListButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  listViewButton: {
    marginTop: 10
  },
  listViewButtonText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: '#014F8F'
  },
  listViewArrowIcon: {
    height: 13,
    marginRight: 5
  },
  innerListViewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
