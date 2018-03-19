import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Task from '../screens/Task';
import SignIn from '../screens/SignIn';
import Outreach from '../screens/Outreach';
import Scout from '../screens/Scouting';
import SeeAllResponsibilities from '../screens/SeeAllResponsibilities';
import History from '../screens/History';
import Profile from '../screens/Profile';
import TasksSummary from '../screens/TaskSummary';
import AddScout from '../screens/AddScout';
import MatchResult from '../screens/MatchResult';

import taskIcon from '../images/task-icon.png';
import outreachIcon from '../images/outreach-icon.png';
import scoutIcon from '../images/scout-icon.png';

export const AuthStack = StackNavigator(
  {
    SignIn: {
      screen: SignIn
    }
  },
  {
    headerMode: 'none'
  }
);

export const TaskStack = StackNavigator({
  Task: {
    screen: Task,
    navigationOptions: {
      header: null
    }
  },
  SeeAllResponsibilities: {
    screen: SeeAllResponsibilities,
    navigationOptions: {
      header: null
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      tabBar: false
    }
  },
  TasksSummary: {
    screen: TasksSummary,
    navigationOptions: {
      header: null
    }
  }
});

export const OutreachStack = StackNavigator({
  Outreach: {
    screen: Outreach,
    navigationOptions: {
      header: null
    }
  }
});

export const ScoutStack = StackNavigator({
  Scout: {
    screen: Scout,
    navigationOptions: {
      header: null
    }
  },
  AddScout: {
    screen: AddScout,
    navigationOptions: {
      header: null,
      tabBar: false
    }
  },
  MatchResult: {
    screen: MatchResult,
    navigationOptions: {
      header: null,
      tabBar: false
    }
  }
});

const styles = {
  icon: {
    height: 26,
    width: 22
  }
};

export const Tabs = TabNavigator(
  {
    Tasks: {
      screen: TaskStack,
      navigationOptions: {
        tabBarLabel: 'Task',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={[styles.icon, { tintColor }]}
            source={taskIcon}
            resizeMode="contain"
          />
        )
      }
    },
    Outreach: {
      screen: OutreachStack,
      navigationOptions: {
        tabBarLabel: 'Outreach',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={[styles.icon, { tintColor }]}
            source={outreachIcon}
            resizeMode="contain"
          />
        )
      }
    },
    Scout: {
      screen: ScoutStack,
      navigationOptions: {
        tabBarLabel: 'Scout',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={[styles.icon, { tintColor }]}
            source={scoutIcon}
            resizeMode="contain"
          />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      activeTintColor: '#014F8F',
      activeBackgroundColor: '#F8F8F8',
      inactiveBackgroundColor: '#F8F8F8',
      showIcon: true,
      indicatorStyle: null,
      upperCaseLabel: false
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);
