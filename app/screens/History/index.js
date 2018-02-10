import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import ListButton from '../../components/ListButton';

import Meteor, { createContainer } from 'react-native-meteor';

class History extends Component<{}> {
  render() {
    const { tasks } = this.props;
    return (
      <View style={styles.container}>
        <Header
          headerText="History"
          showBack={true}
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.mainContainer}>
          <ListButton text="See Summary" onPress={() => this.seeSummary()} />
          {tasks.map((e, i) => {
            return (
              <View style={styles.tasksContainer} key={i}>
                <Text style={styles.timeText}>
                  {this.formatNumber(e.hours)}:{this.formatNumber(e.minutes)}
                </Text>
                <Text>
                  {' '}
                  - {this.formatDate(e.endedAt)} - {e.responsibilityText}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  seeSummary() {}

  formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  formatNumber(number) {
    return number < 10 ? '0' + String(number) : String(number);
  }
}

History.propTypes = {
  tasks: PropTypes.array
};

export default createContainer(() => {
  const tasks = Meteor.subscribe('tasks.all');

  const tasksProp = Meteor.collection('tasks').find({
    userId: Meteor.userId()
  });

  return {
    tasks: tasksProp
  };
}, History);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  mainContainer: {
    width: '100%',
    paddingLeft: 20
  },
  tasksContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    padding: 10,
    backgroundColor: '#DFE0E6'
  },
  timeText: {
    color: '#383940',
    fontWeight: '700'
  }
});
