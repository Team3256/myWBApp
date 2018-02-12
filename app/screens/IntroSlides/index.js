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

import Swiper from 'react-native-swiper';

import Slide1 from '../../images/slide1.png';
import Slide2 from '../../images/slide2.png';
import Slide3 from '../../images/slide3.png';

export default class IntroSlides extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      progressPercentage: new Animated.Value(0),
      bgColor: new Animated.Value(0),
      progressHeight: new Animated.Value(15),
      borderRadius: new Animated.Value(100),
      progressOpacity: new Animated.Value(0),
      containerOpacity: new Animated.Value(0),
      disabled: true
    };
  }

  firstPage() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          // Animate value over time
          this.state.progressPercentage, // The value to drive
          {
            toValue: 30, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.bgColor, // The value to drive
          {
            toValue: 0, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.progressHeight, // The value to drive
          {
            toValue: 15, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.borderRadius, // The value to drive
          {
            toValue: 100, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 200
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.progressOpacity, // The value to drive
          {
            toValue: 0, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 200
          }
        )
      ])
    ]).start(); // start the sequence group
  }

  secondPage() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          // Animate value over time
          this.state.progressPercentage, // The value to drive
          {
            toValue: 60, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.bgColor, // The value to drive
          {
            toValue: 0, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.progressHeight, // The value to drive
          {
            toValue: 15, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.borderRadius, // The value to drive
          {
            toValue: 100, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 200
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.progressOpacity, // The value to drive
          {
            toValue: 0, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 200
          }
        )
      ])
    ]).start(); // start the sequence group
  }

  lastPage() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          // Animate value over time
          this.state.progressPercentage, // The value to drive
          {
            toValue: 100, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.bgColor, // The value to drive
          {
            toValue: 100, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        )
      ]),
      Animated.parallel([
        Animated.timing(
          // Animate value over time
          this.state.progressHeight, // The value to drive
          {
            toValue: 45, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 750
          }
        ),
        Animated.timing(
          // Animate value over time
          this.state.borderRadius, // The value to drive
          {
            toValue: 8, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 100
          }
        ),
        ,
        Animated.timing(
          // Animate value over time
          this.state.progressOpacity, // The value to drive
          {
            toValue: 1, // Animate to final value of 1
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            duration: 200
          }
        )
      ])
    ]).start(); // start the sequence group
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
    ).start(() => {
      this.props.close();
    });
  }

  componentDidMount() {
    this.fadeIn();
    this.firstPage();
    // this.secondPage();
    // this.lastPage();
  }

  render() {
    const container = {
      opacity: this.state.containerOpacity,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 1,
      justifyContent: 'flex-end',
      padding: 20,
      paddingBottom: 60
    };

    const progressBar = {
      width: '100%',
      height: this.state.progressHeight,
      backgroundColor: this.state.bgColor.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(223, 224, 230, 1)', 'rgba(1, 79, 143, 1)']
      }),
      borderRadius: this.state.borderRadius
    };

    const animatedViewStyle = {
      width: this.state.progressPercentage.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
      }),
      height: this.state.progressHeight,
      backgroundColor: '#014F8F',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center'
    };

    return (
      <Animated.View style={container}>
        <View
          style={{
            top: '20%',
            left: 0,
            right: 0,
            bottom: '25%',
            position: 'absolute'
          }}
        >
          <Swiper
            onIndexChanged={index => this.changePage(index)}
            showButtons={false}
            showsPagination={false}
            loop={false}
          >
            <View style={styles.slideContainer}>
              <Text style={styles.slideText}>Task Management done right.</Text>
              <Image source={Slide1} style={styles.slideImage} />
            </View>
            <View style={styles.slideContainer}>
              <Text style={styles.slideText}>Outreach Check-in made easy.</Text>
              <Image source={Slide2} style={styles.slideImage} />
            </View>
            <View style={styles.slideContainer}>
              <Text style={styles.slideText}>Scouting turned cool(er).</Text>
              <Image source={Slide3} style={styles.slideImage} />
            </View>
          </Swiper>
        </View>
        <Animated.View style={progressBar}>
          <TouchableOpacity
            onPress={() => this.fadeOut()}
            disabled={this.state.disabled}
            style={{
              borderRadius: 100,
              backgroundColor: 'rgba(1, 1, 1, 0)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Animated.View style={{ opacity: this.state.progressOpacity }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Get Started</Text>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View style={animatedViewStyle} />
        </Animated.View>
      </Animated.View>
    );
  }

  changePage(index) {
    console.log(index);
    switch (index) {
      case 0:
        this.firstPage();
        break;
      case 1:
        this.setState({ disabled: true });
        this.secondPage();
        break;
      case 2:
        this.setState({ disabled: false });
        this.lastPage();
        break;
    }
  }
}

IntroSlides.propTypes = {};

const styles = StyleSheet.create({
  slideContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  slideText: {
    width: 310,
    textAlign: 'center',
    fontSize: 32
  },
  slideImage: {
    width: 170,
    height: 310
  }
});
