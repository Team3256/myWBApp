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

import Header from '../../components/Header';
import AddIcon from '../../images/add.png';

export default class Scouting extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText="Scout"
          showProfile={true}
          navigation={this.props.navigation}
        />
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          contentContainerStyle={styles.mainView}
        >
          <Text style={styles.headerText}>Current</Text>
          <View style={styles.scoutingContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* <View style={styles.scoutingBoxContainer}>
                <View style={[styles.scoutingBoxBase, styles.scoutingBoxBlue]}>
                  <Text style={styles.scoutingBoxInnerText}>3256</Text>
                  <Text style={styles.scoutingBoxInnerText}>Blue</Text>
                </View>
                <Text style={styles.scoutingBoxText}>Assigned</Text>
              </View>
              <View style={styles.scoutingBoxContainer}>
                <View style={[styles.scoutingBoxBase, styles.scoutingBoxRed]}>
                  <Text style={styles.scoutingBoxInnerText}>3256</Text>
                  <Text style={styles.scoutingBoxInnerText}>Blue</Text>
                </View>
                <Text style={styles.scoutingBoxText}>Assigned</Text>
              </View> */}
              <View style={styles.scoutingBoxContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddScout')}
                  style={styles.addManually}
                >
                  <Image source={AddIcon} style={styles.addManuallyIcon} />
                </TouchableOpacity>
                <Text style={styles.scoutingBoxText}>Add Manually</Text>
              </View>
              <View style={styles.spacer} />
            </ScrollView>
          </View>
          <View style={styles.divider} />
          <Text style={styles.headerText}>Previous</Text>
        </ScrollView>
      </View>
    );
  }
}

Scouting.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  mainView: {
    width: '100%',
    height: '100%',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  headerText: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 15
  },
  scoutingContainer: {
    marginTop: 10,
    width: '100%',
    height: 160
  },
  scoutingBoxContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 128,
    height: 130,
    marginLeft: 15
  },
  scoutingBoxBase: {
    width: 128,
    height: 128,
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10
  },
  scoutingBoxRed: {
    backgroundColor: '#C91833'
  },
  scoutingBoxBlue: {
    backgroundColor: '#3CB3EC'
  },
  scoutingBoxInnerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600'
  },
  scoutingBoxText: {
    marginTop: 5,
    fontSize: 16
  },
  addManually: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#DFE0E6'
  },
  addManuallyIcon: {
    width: 45,
    height: 45
  },
  spacer: {
    width: 15,
    height: '100%'
  },
  divider: {
    marginLeft: 15,
    width: '100%',
    height: 1,
    backgroundColor: '#B2B2B2',
    marginBottom: 5,
    opacity: 0.5
  }
});
