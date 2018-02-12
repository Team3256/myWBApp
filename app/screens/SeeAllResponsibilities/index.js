import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import SwipeableView from 'react-native-swipeable-view';

import Meteor, { createContainer } from 'react-native-meteor';

import Header from '../../components/Header';

import DeleteIcon from '../../images/delete.png';

class ShowAllResponsibilities extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  render() {
    const { responsibilities, loading, tasks, currentTask } = this.props;
    return (
      <View style={styles.container}>
        <Header
          headerText="Responsibilities"
          showBack={true}
          showEdit={true}
          toggleEditing={() => this.toggleEditing()}
          isEditing={this.state.isEditing}
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.viewContainer}>
          {responsibilities.map((e, i) => {
            return (
              <SwipeableView
                key={i}
                isOpen={this.state.isEditing}
                btnsArray={[
                  {
                    text: 'Button',
                    onPress: () => this.deleteResponsibility(e),
                    autoClose: true,
                    component: (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'white',
                          paddingTop: 5,
                          paddingRight: 20
                        }}
                      >
                        <Image
                          style={styles.buttonIcon}
                          source={DeleteIcon}
                          resizeMode="contain"
                        />
                      </View>
                    )
                  }
                ]}
                style={{ backgroundColor: 'black' }}
              >
                <View style={styles.responsibility}>
                  <Text style={styles.mediumText}>{e.responsibilityText}</Text>
                  <Text style={styles.regularText}>
                    {' '}
                    - {e.responsibilityCategory}
                  </Text>
                </View>
              </SwipeableView>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  deleteResponsibility(responsibility) {
    console.log(responsibility);
    Meteor.call('responsibilities.delete', responsibility._id, e => {
      if (e) {
        Alert.alert(e.error, e.reason, [
          {
            text: 'OK'
          }
        ]);
      }
    });
  }
}

ShowAllResponsibilities.propTypes = {};

export default createContainer(() => {
  const responsibilitiesSub = Meteor.subscribe('responsibilities.all');
  const responsibilitiesLoading = !responsibilitiesSub.ready();
  const responsibilities = Meteor.collection('responsibilities')
    .find()
    .sort(function(a, b) {
      a = new Date(a.lastUsed);
      b = new Date(b.lastUsed);
      return a > b ? -1 : a < b ? 1 : 0;
    });

  const tasksSub = Meteor.subscribe('tasks.all');
  const tasksLoading = !tasksSub.ready();
  const tasks = Meteor.collection('tasks').find();

  const currentTaskSub = Meteor.subscribe('tasks.getCurrent');
  const currentTaskLoading = !tasksSub.ready();
  const currentTask = Meteor.collection('tasks').find({ endedAt: null })[0];

  return {
    responsibilities: responsibilities,
    loading: responsibilitiesLoading,
    currentTask: currentTask,
    tasks: tasks
  };
}, ShowAllResponsibilities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  viewContainer: {
    height: 'auto',
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0
  },
  responsibility: {
    backgroundColor: '#DFE0E6',
    width: 'auto',
    height: 45,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15
  },
  mediumText: {
    fontWeight: '600',
    color: '#383940'
  },
  regularText: {
    color: '#383940'
  },
  buttonIcon: {
    width: '100%',
    height: '100%'
  }
});
