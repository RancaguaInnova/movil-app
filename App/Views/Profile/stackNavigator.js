import {
  defaultNavigationConfig,
  defaultRightMenu,
} from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Profile from './index'

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Perfil',
        headerRight: defaultRightMenu.rightHeader,
      },
    },
  },
  {
    navigationOptions: defaultNavigationConfig,
  }
)

export { ProfileStack }
