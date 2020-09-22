import React from 'react'
import { View, Text } from 'react-native'
//import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarOptions from './TabBarOptions'
import Tab from 'components/Tab'
import TabBarIcon from 'components/TabBarIcon'
import Directory from 'screens/Directory'
import Home from 'screens/Home'
import Calendar from 'screens/Calendar'
import Services from 'screens/Services'
import Information from 'screens/Information'

/* import Profile from 'screens/Profile'
import Register from 'screens/Profile/Register'
import Forgot from 'screens/Profile/Forgot' */

const HomeStack = createStackNavigator({
  Home,
})

HomeStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused, tintColor }) => (
    <Tab color={tintColor} focused={focused} icon='ios-home' title='Inicio' />
  ),
  tabBarOptions: TabBarOptions,
}

const CalendarStack = createStackNavigator({
  Calendar,
})

CalendarStack.navigationOptions = {
  tabBarLabel: <View />, //'Calendario',
  tabBarIcon: ({ focused, tintColor }) => (
    <Tab color={tintColor} focused={focused} icon='ios-calendar' title='Calendario' />
  ),
  tabBarOptions: TabBarOptions,
}

const ServicesStack = createStackNavigator({
  Services,
})

ServicesStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused, tintColor }) => (
    <Tab color={tintColor} focused={focused} icon='ios-apps' title='Servicios' />
  ),
  tabBarOptions: TabBarOptions,
}

const InformationStack = createStackNavigator({
  Information,
})

InformationStack.navigationOptions = {
  tabBarLabel: <View />, //'Information',
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <Tab
        color={tintColor}
        focused={focused}
        icon='ios-information-circle-outline'
        title='Información'
      />
    )
  },
  tabBarOptions: TabBarOptions,
}

export default createBottomTabNavigator({
  HomeStack,
  CalendarStack,
  ServicesStack,
  InformationStack,
  //ProfileStack,
})
