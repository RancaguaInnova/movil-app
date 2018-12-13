import {
  defaultNavigationConfig,
  defaultRightMenu
} from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Register from './Register'
import Login from './Login'
import Forgot from './Forgot'

export default AuthStack = createStackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Registro',
        headerRight: defaultRightMenu.rightHeader
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Ingreso',
        headerRight: defaultRightMenu.rightHeader
      }
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Recuperar cuenta',
        headerRight: defaultRightMenu.rightHeader
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig,
    headerMode: 'none'
  }
)
