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
      canPress: false
    };
  }

  press(val) {
    this.state[val] = this.state[val] + 1;
    this.forceUpdate();
  }

  render() {
    const { question, backgroundColor } = this.props;
    return (
      <Animated.View style={styles.row}>
        <View style={styles.controlContainer}>
          <Text style={styles.rowText}>{question}</Text>
          <ScoutNum
            changeValue={this.props.changeValue}
            value={
              this.state.scale +
              this.state.switch +
              this.state.exchange +
              this.state.dropped
            }
          />
        </View>
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
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Switch</Text>
              <Text style={styles.buttonNumberText}>{this.state.switch}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.press('scale')}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Scale</Text>
              <Text style={styles.buttonNumberText}>{this.state.scale}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.press('exchange')}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Exchange</Text>
              <Text style={styles.buttonNumberText}>{this.state.exchange}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.press('dropped')}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>None or Dropped</Text>
              <Text style={styles.buttonNumberText}>{this.state.dropped}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    height: 120,
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
  }
});
