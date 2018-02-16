import Meteor from 'react-native-meteor';
import { Alert } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import DeviceInfo from 'react-native-device-info';
import { ServerIP } from './server';

export const TrackLocation = () => {
  const config = {
    desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
    stationaryRadius: 15,
    distanceFilter: 15,
    notificationTitle: 'myWB',
    notificationText: 'Running',
    debug: false,
    startOnBoot: true,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    interval: 10000,
    fastestInterval: 10000,
    activitiesInterval: 10000,
    stopOnStillActivity: false,
    url: 'http://' + ServerIP + '/methods/devices.updateLocation',
    httpHeaders: {
      myWBApp: 'bar'
    },
    postTemplate: {
      lat: '@latitude',
      lng: '@longitude',
      userId: Meteor.userId(),
      UUID: DeviceInfo.getUniqueID()
    }
  };

  BackgroundGeolocation.configure(config);

  BackgroundGeolocation.on('location', location => {
    // handle your locations here
    // to perform long running operation on iOS
    // you need to create background task
    //console.log(location);
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
    //console.log('[ERROR] BackgroundGeolocation error:', error);
  });

  BackgroundGeolocation.on('start', () => {
    //console.log('[INFO] BackgroundGeolocation service has been started');
  });

  BackgroundGeolocation.on('stop', () => {
    //console.log('[INFO] BackgroundGeolocation service has been stopped');
  });

  BackgroundGeolocation.on('authorization', status => {
    //console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
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
    //console.log('[INFO] App is in background');
  });

  BackgroundGeolocation.on('foreground', () => {
    //console.log('[INFO] App is in foreground');
  });

  BackgroundGeolocation.checkStatus(status => {
    //console.log(
    //   '[INFO] BackgroundGeolocation service is running',
    //   status.isRunning
    // );
    //console.log(
    //   '[INFO] BackgroundGeolocation service has permissions',
    //   status.hasPermissions
    // );
    //console.log(
    //   '[INFO] BackgroundGeolocation auth status: ' + status.authorization
    // );
  });

  BackgroundGeolocation.start();
};
