import {
  defaultNavigationConfig,
  defaultRightMenu,
} from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Calendar from './index'

const CalendarStack = createStackNavigator(
  {
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Calendario',
        headerRight: defaultRightMenu.rightHeader,
      },
    },
  },
  {
    navigationOptions: defaultNavigationConfig,
  }
)

export { CalendarStack }
