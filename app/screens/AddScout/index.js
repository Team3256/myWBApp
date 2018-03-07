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
import ScoutNum from '../../components/ScoutNum';

import nextIcon from '../../images/next-arrow.png';
import ScoutDropdownBox from '../../components/ScoutDropdownBox';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class AddScout extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      fabPos: new Animated.Value(0),
      teleop: {},
      auto: {},
      shouldDoneFloat: false,
      isRed: false
    };

    this.redColor = '#C91833';
    this.blueColor = '#3CB3EC';

    this.autoElements = [];
    this.teleopElements = [];
  }

  componentDidMount() {
    Meteor.call('scouting.getScoutingSchema', (err, schema) => {
      console.log(schema);
      this.autoElements = schema.auto;

      this.autoElements.map(e => {
        this.state.auto[e.id] = e.defaultValue;
      });

      this.teleopElements = schema.teleop;

      this.teleopElements.map(e => {
        this.state.teleop[e.id] = e.defaultValue;
      });

      this.forceUpdate();
    });
    Meteor.call('teams.get', (err, yeet) => {
      console.log(yeet);
    });
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
    mode: 'modal'
  });

  togglePage() {
    console.log(this.state);
    if (this.state.pageIndex == 0) {
      this.setState({ pageIndex: 1 });
      Animated.timing(this.state.fabPos, {
        toValue: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }).start();
    } else {
      Animated.timing(this.state.fabPos, {
        toValue: 0,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        duration: 400
      }).start(() => {
        this.setState({ pageIndex: 0 });
      });
    }
    const finalScoutObj = {};
    this.autoElements.map(e => {
      finalScoutObj[e.id] = this.state[e.id];
    });
    console.log({ auto: this.state.auto, teleop: this.state.teleop });
  }

  renderType(e, obj) {
    switch (e.type) {
      case 'bool':
        return (
          <View style={styles.row} key={e.id}>
            <Text style={styles.rowText}>{e.question}</Text>
            <ScoutBool
              changeValue={newValue => {
                this.state[obj][e.id] = newValue;
                this.forceUpdate();
              }}
              value={this.state[obj][e.id]}
            />
          </View>
        );
        break;
      case 'number':
        return (
          <View style={styles.row} key={e.id}>
            <Text style={styles.rowText}>{e.question}</Text>
            <ScoutNum
              changeValue={newValue => {
                this.state[obj][e.id] = newValue;
                this.forceUpdate();
              }}
              value={this.state[obj][e.id]}
            />
          </View>
        );
        break;
      case 'number-dropdown':
        return (
          <ScoutDropdownBox
            question={e.question}
            changeValue={newValue => {
              this.state[obj][e.id] = newValue;
              this.forceUpdate();
            }}
            value={this.state[obj][e.id]}
            backgroundColor={this.state.isRed ? this.redColor : this.blueColor}
          />
        );
        break;
    }
  }

  renderElement(e, obj) {
    return this.renderType(e, obj);
  }

  enableFloatingButton() {
    this.setState({ shouldDoneFloat: true });
  }

  render() {
    const { height, width } = Dimensions.get('window');
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
      }),
      opacity: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0]
      })
    };
    const pageTwo = {
      left: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: ['110%', '3%']
      }),
      opacity: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
      })
    };
    const progressWidth = {
      width: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '85%']
      })
    };
    const doneOpacity = {
      opacity: this.state.fabPos.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
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
          <View style={[styles.scoutingHeader, styles.scoutingHeaderBlue]}>
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
              <ScrollView
                style={{ width: '100%', height: '100%' }}
                showsVerticalScrollIndicator={false}
              >
                {this.autoElements.map((e, i) => {
                  return this.renderElement(e, 'auto');
                })}
              </ScrollView>
            </Animated.View>
            <Animated.View style={[styles.pageTwo, pageTwo]}>
              <ScrollView
                style={{ width: '100%', height: '100%' }}
                showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    this.enableFloatingButton();
                  }
                }}
              >
                {this.teleopElements.map((e, i) => {
                  return this.renderElement(e, 'teleop');
                })}
                <View style={styles.doneButtonContainer}>
                  {!this.state.shouldDoneFloat ? (
                    <TouchableOpacity style={styles.doneButton}>
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </ScrollView>
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
          {this.state.pageIndex == 1 && this.state.shouldDoneFloat ? (
            <Animated.View
              style={[
                styles.doneButton,
                doneOpacity,
                styles.doneButtonContainerStatic
              ]}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : null}
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

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scoutingHeaderBlue: {
    backgroundColor: '#3CB3EC'
  },
  scoutingHeaderRed: {
    backgroundColor: '#C91833'
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
    height: Dimensions.get('window').height - 190
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
    fontSize: 26,
    fontWeight: '600'
  },
  doneButtonContainer: {
    width: '100%',
    height: 62,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  doneButtonContainerStatic: {
    position: 'absolute',
    bottom: '12%',
    right: 10
  },
  doneButton: {
    width: 100,
    height: 55,
    backgroundColor: '#28DB41',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white'
  }
});
