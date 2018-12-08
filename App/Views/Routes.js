import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import { Ionicons } from '@expo/vector-icons'
import { sectionIcon } from 'App/helpers/icon'
import tabBarStyle from 'App/styles/tabBarStyle'

import { HomeStack } from './Home/stackNavigator'
import { CalendarStack } from './Calendar/stackNavigator'
import { AppsStack } from './Apps/stackNavigator'
import { ProfileStack } from './Profile/stackNavigator'
import { DirectoryStack } from './Directory/stackNavigator'
import Register from 'App/Auth/Main/Password/Register'
import Login from 'App/Auth/Main/Password/Login'

// Main tab navigation config
const AppTabRoutes = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Inicio',
      },
    },
    Calendar: {
      screen: CalendarStack,
      navigationOptions: {
        tabBarLabel: 'Calendario',
      },
    },
    Integrations: {
      screen: AppsStack,
      navigationOptions: {
        tabBarLabel: 'Servicios',
      },
    },
    Directory: {
      screen: DirectoryStack,
      navigationOptions: {
        tabBarLabel: 'Directorio',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Perfil',
      },
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const iconName = sectionIcon(routeName, focused)
        return <Ionicons name={iconName} size={28} color={tintColor} />
      }
    }),
    tabBarOptions: tabBarStyle,
    animationEnabled: true,
    swipeEnabled: true
  }
)
export default AppTabRoutes
