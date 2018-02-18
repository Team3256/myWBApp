import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component<{}> {
  render() {
    const { onPress, disabled, text, style, textStyle } = this.props;
    if (Platform.OS == 'ios') {
      return (
        <TouchableOpacity
          style={style}
          onPress={() => onPress()}
          disabled={disabled}
        >
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
      );
    }
    if (Platform.OS == 'android') {
      return (
        <TouchableNativeFeedback
          onPress={() => onPress()}
          disabled={disabled}
          background={
            Platform.Version >= 21
              ? TouchableNativeFeedback.Ripple('rgba(0,0,0,.5)', false)
              : TouchableNativeFeedback.SelectableBackground()
          }
        >
          <View style={style}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  style: PropTypes.number,
  textStyle: PropTypes.number
};

const styles = StyleSheet.create({});
