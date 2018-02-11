import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  DeviceEventEmitter,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import QuickActions from 'react-native-quick-actions';

import Meteor, { createContainer } from 'react-native-meteor';
import { NavigationActions } from 'react-navigation';

import Header from '../../components/Header';
import TaskBox from '../../components/TaskBox';
import RunningTaskBox from '../../components/RunningTaskBox';
import AddTaskBox from '../../components/AddTaskBox';
import AddResponsibilityModal from '../../components/AddResponsibilityModal';

import ListButton from '../../components/ListButton';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import DeviceInfo from 'react-native-device-info';

class Task extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      currentLocation: {}
    };
    var subscription = DeviceEventEmitter.addListener(
      'quickActionShortcut',
      function(data) {
        console.log(data.title);
        console.log(data.type);
        console.log(data.userInfo);
      }
    );
  }

  componentWillMount() {
    QuickActions.setShortcutItems([
      {
        type: 'Tasks', // Required
        title: 'Open Tasks', // Optional, if empty, `type` will be used instead
        subtitle: 'View your tasks',
        icon: 'TaskCompleted', // Pass any of UIApplicationShortcutIconType<name>
        userInfo: {
          url: 'Tasks' // provide custom data, like in-app url you want to open
        }
      },
      {
        type: 'Outreach', // Required
        title: 'Open Outreach', // Optional, if empty, `type` will be used instead
        subtitle: 'Track your hours',
        icon: 'Location', // Pass any of UIApplicationShortcutIconType<name>
        userInfo: {
          url: 'Outreach' // provide custom data, like in-app url you want to open
        }
      }
    ]);

    QuickActions.popInitialAction()
      .then(action => {
        console.log(action);
        if (action) {
          this.props.navigation.navigate(action.userInfo.url);
        }
      })
      .catch(console.error);

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
      stationaryRadius: 20,
      distanceFilter: 5,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 5000,
      fastestInterval: 4000,
      activitiesInterval: 4000,
      stopOnStillActivity: false,
      url: 'http://10.78.16.218:3000/methods/devices.updateLocation',
      httpHeaders: {
        myWBApp: 'bar'
      },
      postTemplate: {
        lat: '@latitude',
        lng: '@longitude',
        userId: Meteor.userId(),
        UUID: DeviceInfo.getUniqueID()
      }
    });

    BackgroundGeolocation.on('location', location => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log(location);
      this.setState({ currentLocation: location });
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', error => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        Alert.alert(
          'Location services are disabled',
          'Would you like to open location settings?',
          [
            {
              text: 'Yes',
              onPress: () => BackgroundGeolocation.showLocationSettings()
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel'
            }
          ]
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning
      );
      console.log(
        '[INFO] BackgroundGeolocation service has permissions',
        status.hasPermissions
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization
      );
    });
  }

  render() {
    const { responsibilities, loading, tasks, currentTask } = this.props;
    return (
      <View style={styles.container}>
        <Header
          headerText="Task"
          showProfile={true}
          navigation={this.props.navigation}
        />
        <AddResponsibilityModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={() => this.toggleModal()}
          submitResponsibility={(text, category) =>
            this.createNewResponsibility(text, category)
          }
        />
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.historyContainer}>
            <View style={styles.responsibilityOptions}>
              <Text style={styles.historyText}>Responsibility</Text>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <Text style={styles.seeAllText}>Add...</Text>
              </TouchableOpacity>
            </View>
            <ListButton
              onPress={() => this.showAllResponsibilities()}
              text="See All Responsibilities"
            />
            <View style={styles.responsibilitiesList}>
              {responsibilities.map((e, i) => {
                if (currentTask && currentTask.responsibilityId == e._id) {
                  return (
                    <RunningTaskBox
                      runningTask={currentTask}
                      responsibility={e}
                      stopTask={e => this.stopTask(e)}
                      key={i}
                    />
                  );
                } else {
                  return (
                    <TaskBox
                      responsibility={e}
                      startTask={e => this.startTask(e)}
                      runningTask={currentTask}
                      key={i}
                    />
                  );
                }
              })}
            </View>
          </View>
          <View style={styles.historyContainer}>
            <View style={styles.containerDivider} />
            <Text style={styles.historyText}>History</Text>
            <View style={styles.containerDivider} />
            <ListButton
              onPress={() => this.showHistory()}
              text="See All History"
            />
          </View>
          <Text>{JSON.stringify(this.state.currentLocation)}</Text>
        </ScrollView>
      </View>
    );
  }

  showAllResponsibilities() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'SeeAllResponsibilities',
      params: {}
    });

    this.props.navigation.dispatch(navigateAction);
  }

  showHistory() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'History',
      params: {}
    });

    this.props.navigation.dispatch(navigateAction);
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  createNewResponsibility(text, category) {
    Meteor.call('responsibilities.insert', {
      responsibilityText: text,
      responsibilityCategory: category
    });
  }

  startTask(obj) {
    BackgroundGeolocation.start();
    Meteor.call('tasks.start', obj._id, e => {
      if (e) {
        Alert.alert(e.error, e.reason, [
          {
            text: 'OK'
          }
        ]);
      } else {
        console.log('no error');
        Meteor.call('responsibilities.lastUsed', obj);
      }
    });
  }

  stopTask(currentTask) {
    BackgroundGeolocation.stop();
    Meteor.call('tasks.end', currentTask, e => {
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

Task.propTypes = {
  responsibilities: PropTypes.array,
  loading: PropTypes.bool,
  currentTask: PropTypes.object,
  tasks: PropTypes.array
};

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
}, Task);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  responsibilitiesContainer: {
    height: 'auto',
    width: '100%',
    flexDirection: 'column'
  },
  responsibilityOptions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 20
  },
  responsibilityText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black'
  },
  seeAllText: {
    fontSize: 14,
    color: '#014F8F',
    marginTop: 10
  },
  responsibilitiesList: {
    marginTop: 10,
    marginRight: 15,
    marginBottom: -20,
    paddingBottom: 0,
    flexDirection: 'column',
    height: 'auto'
  },
  divider: {
    width: 20,
    height: '100%'
  },
  historyContainer: {
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: 'column'
  },
  historyText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  }
});
