import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import ScoutNum from './ScoutNum';

export default class ScoutDropdownBox extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      switch: 0,
      scale: 0,
      exchange: 0,
      dropped: 0,
      isOpen: false,
      dropdownHeight: new Animated.Value(0),
      pickupCubeObj: null,
      placedCubeObj: null
    };
  }

  componentDidMount() {}

  press(val) {
    this.state[val] = this.state[val] + 1;
    const placedCubeObj = {
      title: 'Placed cube',
      description: 'The robot placed a cube in the ' + val,
      where: val,
      time: this.props.time,
      ms: new Date(),
      value: true,
      howLong: new Date() - this.state.pickupCubeObj.ms
    };
    this.setState({
      placedCubeObj: placedCubeObj
    });

    this.props.addToTimeline(this.state.pickupCubeObj, placedCubeObj);
    this.props.changeValue(this.props.value[val] + 1, val);
    this.forceUpdate();
    this.close();
  }

  open() {
    Animated.timing(
      // Animate value over time
      this.state.dropdownHeight, // The value to drive
      {
        toValue: 120, // Animate to final value of 1
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }
    ).start(() => {
      this.setState({ isOpen: true });
      this.setState({
        pickupCubeObj: {
          title: 'Picked up cube',
          description: 'The robot picked up a cube',
          time: this.props.time,
          ms: new Date(),
          value: true
        }
      });
    });
  }

  close() {
    this.setState({ isOpen: false });
    Animated.timing(
      // Animate value over time
      this.state.dropdownHeight, // The value to drive
      {
        toValue: 0, // Animate to final value of 1
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }
    ).start(() => {
      this.setState({ pickupCubeObj: null });
      this.setState({ placedCubeObj: null });
    });
  }

  subtract() {
    if (this.state.isOpen) {
      this.close();
    } else {
    }
  }

  render() {
    const dropdownAnimatedStyle = {
      height: this.state.dropdownHeight,
      opacity: this.state.dropdownHeight.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
      })
    };

    const buttonInner = {
      opacity: this.state.dropdownHeight.interpolate({
        inputRange: [0, 100],
        outputRange: [-3, 1]
      })
    };
    const { question, backgroundColor } = this.props;
    const { isOpen, dropdownHeight } = this.state;
    return (
      <Animated.View style={styles.row}>
        <View style={styles.controlContainer}>
          <Text style={styles.rowText}>{question}</Text>
          <View style={styles.containerScoutNum}>
            <TouchableOpacity
              onPress={() => this.subtract()}
              style={[styles.circle, styles.circleActive]}
            >
              <Text style={[styles.circleText, styles.circleActiveText]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>
              {this.state.switch + this.state.scale + this.state.exchange}
            </Text>
            <TouchableOpacity
              onPress={() => this.open()}
              style={[styles.circle, styles.circleActive]}
            >
              <Text style={[styles.circleText, styles.circleActiveText]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View style={dropdownAnimatedStyle}>
          <View
            style={[
              styles.arrow,
              { borderBottomColor: backgroundColor ? backgroundColor : 'black' }
            ]}
          />
          <View
            style={[
              styles.dropdown,
              { backgroundColor: backgroundColor ? backgroundColor : 'black' }
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.press('switch')}
              disabled={!isOpen}
            >
              <Animated.View style={buttonInner}>
                <Text style={styles.buttonText}>Switch</Text>
                <Text style={styles.buttonNumberText}>{this.state.switch}</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.press('scale')}
              disabled={!isOpen}
            >
              <Animated.View style={buttonInner}>
                <Text style={styles.buttonText}>Scale</Text>
                <Text style={styles.buttonNumberText}>{this.state.scale}</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.press('exchange')}
              disabled={!isOpen}
            >
              <Animated.View style={buttonInner}>
                <Text style={styles.buttonText}>Exchange</Text>
                <Text style={styles.buttonNumberText}>
                  {this.state.exchange}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.press('dropped')}
              disabled={!isOpen}
            >
              <Animated.View style={buttonInner}>
                <Text style={styles.buttonText}>None or Dropped</Text>
                <Text style={styles.buttonNumberText}>
                  {this.state.dropped}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

ScoutDropdownBox.propTypes = {
  question: PropTypes.string
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'column'
  },
  rowText: {
    fontSize: 26,
    fontWeight: '600'
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    marginBottom: 5
  },
  arrow: {
    alignSelf: 'flex-end',
    marginRight: 12,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  },
  dropdown: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'white'
  },
  buttonInner: {
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontWeight: '700'
  },
  buttonNumberText: {
    textAlign: 'center',
    fontSize: 35,
    color: 'white'
  },
  containerScoutNum: {
    width: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 100,
    borderColor: '#DFE0E6',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45
  },
  circleActive: {
    borderColor: '#014F8F'
  },
  circleText: {
    color: '#DFE0E6',
    fontSize: 28,
    fontWeight: '500',
    bottom: 2
  },
  circleActiveText: {
    color: '#014F8F',
    fontWeight: '500'
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600'
  }
});
