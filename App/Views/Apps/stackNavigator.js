import React from 'react'
import {
  defaultNavigationConfig,
  defaultRightMenu,
} from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Apps from './index'

const AppsStack = createStackNavigator(
  {
    Apps: {
      screen: Apps,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Servicios',
        headerRight: defaultRightMenu.rightHeader,
      },
    },
  },
  {
    navigationOptions: defaultNavigationConfig,
    cardStyle: {
      backgroundColor: '#f1f1f1',
    },
  }
)

export { AppsStack }
