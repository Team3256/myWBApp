import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Circle } from 'react-native-maps';

import Header from '../../components/Header';
import PinImage from '../../images/map-pin.png';

export default class Outreach extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.159528,
        longitude: -121.669215,
        latitudeDelta: 0.0072,
        longitudeDelta: 0.0072
      },
      radius: 300
    };
  }

  render() {
    const { region, radius } = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText="Outreach"
          showProfile={true}
          navigation={this.props.navigation}
        />
        <ScrollView style={{ width: '100%', padding: 0, margin: 0 }}>
          <View style={styles.mainContainer}>
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={region}
                region={region}
                provider={undefined}
                style={styles.map}
                zoomEnabled={false}
                rotateEnabled={false}
                onRegionChange={() => this.onRegionChange()}
              >
                <MapView.Marker
                  coordinate={region}
                  title="Ann Sobrato"
                  description="High School"
                  centerOffset={{ x: 13, y: -12 }}
                  calloutOffset={{ x: -8, y: -2 }}
                >
                  <Image
                    source={PinImage}
                    style={styles.pinStyle}
                    resizeMode="contain"
                  />
                </MapView.Marker>
                <Circle
                  center={region}
                  radius={radius}
                  fillColor="rgba(1, 79, 143, 0.20)"
                  strokeColor="rgba(1, 79, 143, 1)"
                  strokeWidth={3}
                />
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <TouchableOpacity
                onPress={() => {
                  console.log('pressed');
                }}
                style={styles.remindButton}
                activeOpacity={0.7}
              >
                <Text
                  style={styles.remindButtonText}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  Remind me about Sobrato Outreach
                </Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.dateText}>
                  Outreach on January 27, 2018.
                </Text>
                <Text style={styles.reminderText}>
                  Please stay in the geofence during the outreach in order to
                  gain credit.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onRegionChange() {
    this.setState(this.state);
  }
}

Outreach.propTypes = {
  loadingText: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  mainContainer: {
    marginTop: 13,
    marginBottom: 13,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mapContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 8
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DFE0E6'
  },
  infoContainer: {
    marginTop: 15,
    width: '90%'
  },
  remindButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#014F8F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  remindButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    width: '100%',
    height: '100%'
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  dateText: {
    fontWeight: '600',
    color: '#979797',
    fontSize: 14
  },
  reminderText: {
    color: '#979797',
    fontSize: 14,
    width: '75%',
    textAlign: 'center'
  },
  pinStyle: {
    width: 33,
    height: 43
  }
});
