import {
  defaultNavigationConfig,
  defaultRightMenu
} from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Profile from './Profile'
import AuthStack from './Auth/stackNavigator'

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Perfil',
        headerRight: defaultRightMenu.rightHeader
      }
    },
    Auth: {
      screen: AuthStack,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Administra tu cuenta',
        headerRight: defaultRightMenu.rightHeader
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig
  }
)

export { ProfileStack }
