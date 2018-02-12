import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor from 'react-native-meteor';
import IntroSlides from '../IntroSlides';

export default class SignIn extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
      shouldShowSlides: false
    };
  }

  componentWillMount() {
    const value = AsyncStorage.getItem('@myWB:shouldShowSlides2', (e, r) => {
      if (!r) {
        this.setState({ shouldShowSlides: true });
      }
    });
  }

  closeSlides() {
    AsyncStorage.setItem('@myWB:shouldShowSlides2', 'false');
    this.setState({ shouldShowSlides: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" />
        {this.state.shouldShowSlides ? (
          <IntroSlides close={() => this.closeSlides()} />
        ) : null}
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText1}>欢迎</Text>
          <Text style={styles.welcomeText2}>Chào mừng</Text>
          <Text style={styles.welcomeText3}>Bienvenido</Text>
          <Text style={styles.welcomeText4}>स्वागत हे</Text>
          <Text style={styles.welcomeText5}>Welcome</Text>
        </View>
        <View style={styles.loginView}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ email: text.toLowerCase() })}
            placeholder="Warriorlife Email"
            placeholderTextColor="#BEBFC6"
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ password: text })}
            placeholder="Password"
            placeholderTextColor="#BEBFC6"
            value={this.state.password}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() => {
              this.login();
            }}
            style={styles.loginButton}
            activeOpacity={0.7}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {this.state.error ? (
            <Text style={styles.errorText}>{this.state.error.reason}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  login() {
    Meteor.loginWithPassword(this.state.email, this.state.password, err => {
      console.log(err);
      this.setState({ error: err });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loginView: {
    height: '58%',
    marginTop: '20%',
    marginLeft: 20,
    marginRight: 20
  },
  textInput: {
    backgroundColor: '#EFF0F2',
    borderColor: '#DFE0E6',
    borderWidth: 1,
    height: 35,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    marginBottom: 10
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#014F8F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16
  },
  welcomeView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#014F8F'
  },
  welcomeText1: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 34,
    color: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'stretch',
    position: 'absolute',
    top: '15%',
    left: '15%'
  },
  welcomeText2: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 34,
    color: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'stretch',
    position: 'absolute',
    top: '32%',
    right: '10%'
  },
  welcomeText3: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 34,
    color: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'stretch',
    position: 'absolute',
    left: '10%',
    bottom: '30%'
  },
  welcomeText4: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 34,
    color: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'stretch',
    position: 'absolute',
    marginLeft: 10,
    marginBottom: 10,
    right: '15%',
    bottom: '10%'
  },
  welcomeText5: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 34,
    color: 'white',
    alignSelf: 'flex-start',
    position: 'absolute',
    marginLeft: 15,
    marginBottom: 15,
    bottom: 0
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 10,
    color: 'red'
  }
});
