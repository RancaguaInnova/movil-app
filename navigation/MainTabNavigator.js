import React from 'react'
//import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarOptions from './TabBarOptions'

import TabBarIcon from 'components/TabBarIcon'
import Home from 'screens/Home'
import Calendar from 'screens/Calendar'
import Services from 'screens/Services'
import Directory from 'screens/Directory'
import Profile from 'screens/Profile'
import Register from 'screens/Profile/Register'
import Forgot from 'screens/Profile/Forgot'

const HomeStack = createStackNavigator({
  Home,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='ios-home' />,
  tabBarOptions: TabBarOptions,
}

const CalendarStack = createStackNavigator({
  Calendar,
})

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendario',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-calendar' />
  ),
  tabBarOptions: TabBarOptions,
}

const ServicesStack = createStackNavigator({
  Services,
})

ServicesStack.navigationOptions = {
  tabBarLabel: 'Servicios',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-apps' />
  ),
  tabBarOptions: TabBarOptions,
}

const DirectoryStack = createStackNavigator({
  Directory,
})

DirectoryStack.navigationOptions = {
  tabBarLabel: 'Directorio',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-call' />
  ),
  tabBarOptions: TabBarOptions,
}

const ProfileStack = createStackNavigator({
  Profile,
  Register,
  Forgot,
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-person' />
  ),
  tabBarOptions: TabBarOptions,
}

export default createBottomTabNavigator({
  HomeStack,
  CalendarStack,
  ServicesStack,
  DirectoryStack,
  ProfileStack,
})
