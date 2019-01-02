import React from 'react'
//import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarOptions from './TabBarOptions'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import CalendarScreen from '../screens/CalendarScreen'
import ServicesScreen from '../screens/ServicesScreen'
import DirectoryScreen from '../screens/DirectoryScreen'
import ProfileScreen from '../screens/ProfileScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='ios-home' />,
  tabBarOptions: TabBarOptions,
}

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
})

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendario',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-calendar' />
  ),
  tabBarOptions: TabBarOptions,
}

const ServicesStack = createStackNavigator({
  Services: ServicesScreen,
})

ServicesStack.navigationOptions = {
  tabBarLabel: 'Servicios',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-apps' />
  ),
  tabBarOptions: TabBarOptions,
}

const DirectoryStack = createStackNavigator({
  Directory: DirectoryScreen,
})
DirectoryStack.navigationOptions = {
  tabBarLabel: 'Directorio',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon color={tintColor} focused={focused} name='ios-call' />
  ),
  tabBarOptions: TabBarOptions,
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
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
