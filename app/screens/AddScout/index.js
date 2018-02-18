import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Platform,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor from 'react-native-meteor';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import ScoutBool from '../../components/ScoutBool';

import nextIcon from '../../images/next-arrow.png';

export default class AddScout extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      fabPos: new Animated.Value(0),
      teleop: {},
      auto: {}
    };

    this.autoElements = [
      {
        id: 'crossedLine',
        question: 'Crossed Line?',
        type: 'bool',
        defaultValue: false
      },
      {
        id: 'disconnected',
        question: 'Disconnected?',
        type: 'bool',
        defaultValue: false
      }
    ];

    this.autoElements.map(e => {
      this.state.auto[e.id] = e.defaultValue;
    });

    this.teleopElements = [
      {
        id: 'crossedLine',
        question: 'Crossed Line?',
        type: 'bool',
        defaultValue: false
      },
      {
        id: 'disconnected',
        question: 'Disconnected?',
        type: 'bool',
        defaultValue: false
      }
    ];

    this.teleopElements.map(e => {
      this.state.teleop[e.id] = e.defaultValue;
    });
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    mode: 'modal'
  });

  togglePage() {
    if (this.state.pageIndex == 0) {
      Animated.timing(this.state.fabPos, {
        toValue: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }).start();
      this.setState({ pageIndex: 1 });
    } else {
      Animated.timing(this.state.fabPos, {
        toValue: 0,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }).start();
      this.setState({ pageIndex: 0 });
    }
    const finalScoutObj = {};
    this.autoElements.map(e => {
      finalScoutObj[e.id] = this.state[e.id];
    });
    console.log(this.state.auto);
    console.log(this.state.teleop);
  }

  renderType(e, obj) {
    switch (e.type) {
      case 'bool':
        return (
          <ScoutBool
            changeValue={newValue => {
              this.state[obj][e.id] = newValue;
              this.forceUpdate();
            }}
            value={this.state[obj][e.id]}
          />
        );
        break;
    }
  }

  renderElement(e, obj) {
    return (
      <View style={styles.row} key={e.id}>
        <Text style={styles.rowText}>{e.question}</Text>
        {this.renderType(e, obj)}
      </View>
    );
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { user, editing } = this.state;
    const fabButtonPos = {
      right: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: [20, width - 70]
      }),
      transform: [
        {
          rotate: this.state.fabPos.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '-180deg']
          })
        }
      ]
    };
    const pageOne = {
      left: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: ['3%', '-100%']
      })
    };
    const pageTwo = {
      left: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: ['110%', '3%']
      })
    };
    const progressWidth = {
      width: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '85%']
      })
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerName}>Scouting</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.scoutingHeader}>
            <Text style={styles.scoutingHeaderText}>3256</Text>
            <Text style={styles.scoutingHeaderText}>Blue Alliance</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarSmall} />
              <Animated.View style={[styles.progressBarLarge, progressWidth]} />
            </View>
            <View style={styles.progressTextContainer}>
              <Text style={{ width: '15%' }}>Auto</Text>
              <Text>TeleOp + End Game</Text>
            </View>
          </View>
          <View style={styles.pageContainer}>
            <Animated.View style={[styles.pageOne, pageOne]}>
              {this.autoElements.map((e, i) => {
                return this.renderElement(e, 'auto');
              })}
            </Animated.View>
            <Animated.View style={[styles.pageTwo, pageTwo]}>
              {this.teleopElements.map((e, i) => {
                return this.renderElement(e, 'teleop');
              })}
            </Animated.View>
          </View>
          <Animated.View style={[styles.fab, fabButtonPos]}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => this.togglePage()}
            >
              <Image
                source={nextIcon}
                resizeMode="contain"
                style={styles.fabIcon}
              />
            </TouchableOpacity>
          </Animated.View>
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
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerName: {
    position: 'absolute',
    left: '45%',
    bottom: 10,
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
    height: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: '12%',
    width: 55,
    height: 55,
    backgroundColor: '#014F8F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabIcon: {
    left: 2,
    width: 16,
    height: 27
  },
  scoutingHeader: {
    width: '100%',
    height: 65,
    backgroundColor: '#3CB3EC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scoutingHeaderText: {
    fontSize: 35,
    fontWeight: '600',
    marginLeft: 15,
    marginRight: 15,
    color: 'white'
  },
  progressContainer: {
    width: '100%',
    height: 58,
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4'
  },
  progressBarContainer: {
    width: '100%',
    height: 13,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#BFC0C9',
    borderRadius: 100
  },
  progressBarSmall: {
    width: '15%',
    height: '100%',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#28DB41',
    borderRightWidth: 2,
    borderColor: 'white'
  },
  progressBarLarge: {
    height: '100%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#28DB41'
  },
  progressTextContainer: {
    flexDirection: 'row'
  },
  pageContainer: {
    width: '100%',
    height: '100%'
  },
  pageOne: {
    width: '94%',
    height: '100%',
    position: 'absolute'
  },
  pageTwo: {
    width: '94%',
    height: '100%',
    position: 'absolute'
  },
  row: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowText: {
    fontSize: 26
  }
});
