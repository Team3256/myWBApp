import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import WBLogo from '../../images/wblogo.png';

export default class NoConnection extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      containerOpacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.fadeIn();
  }

  componentWillUnmount() {
    this.fadeOut();
  }

  fadeIn() {
    Animated.timing(
      // Animate value over time
      this.state.containerOpacity, // The value to drive
      {
        toValue: 1, // Animate to final value of 1
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 500
      }
    ).start();
  }

  fadeOut() {
    Animated.timing(
      // Animate value over time
      this.state.containerOpacity, // The value to drive
      {
        toValue: 0, // Animate to final value of 1
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 750
      }
    ).start(() => {});
  }

  render() {
    const container = {
      opacity: this.state.containerOpacity,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 1,
      justifyContent: 'space-between',
      padding: 15,
      paddingTop: 60,
      paddingBottom: 30
    };

    if (this.props.connection) {
      this.fadeOut();
    }

    return (
      <Animated.View style={container}>
        <View style={styles.textContainer}>
          <Text style={styles.errorTitle}>Server Unavailable.</Text>
          <Text style={styles.subtext}>
            Please allow server to restart. This page will disappear if the
            server becomes available.
          </Text>
        </View>
        <Image source={WBLogo} style={styles.WBLogo} />
      </Animated.View>
    );
  }
}

NoConnection.propTypes = {
  connection: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  textContainer: {},
  errorTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#C91833'
  },
  subtext: {
    fontSize: 34,
    fontWeight: '300',
    color: '#979797'
  },
  WBLogo: {
    alignSelf: 'center',
    width: 56,
    height: 27
  }
});
