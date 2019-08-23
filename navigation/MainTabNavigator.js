import React from 'react'
import { View, Text } from 'react-native'
//import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarOptions from './TabBarOptions'
import Tab from 'components/Tab'
import TabBarIcon from 'components/TabBarIcon'
import Home from 'screens/Home'
import Calendar from 'screens/Calendar'
import Services from 'screens/Services'
import Directory from 'screens/Directory'
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
/*
const DirectoryStack = createStackNavigator({
  Directory,
})

DirectoryStack.navigationOptions = {
  tabBarLabel: <View />, //'Directorio',
  tabBarIcon: ({ focused, tintColor }) => {
    return <Tab color={tintColor} focused={focused} icon='ios-call' title='Directorio' />
  },
  tabBarOptions: TabBarOptions,
}
*/
const InformationStack = createStackNavigator({
  Information,
})

InformationStack.navigationOptions = {
  tabBarLabel: <View />, //'Information',
  tabBarIcon: ({ focused, tintColor }) => {
    return <Tab color={tintColor} focused={focused} icon='ios-call' title='Información' />
  },
  tabBarOptions: TabBarOptions,
}

/* const ProfileStack = createStackNavigator({
  Profile,
  Register,
  Forgot,
}) */

/* ProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-person' />
  ),
  tabBarOptions: TabBarOptions,
} */

export default createBottomTabNavigator({
  HomeStack,
  CalendarStack,
  ServicesStack,
  InformationStack,
  //ProfileStack,
})
