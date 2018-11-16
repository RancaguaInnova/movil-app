import { defaultNavigationConfig } from 'App/components/CustomHeader/defaultNavigationConfig'
import { createStackNavigator } from 'react-navigation'
import Home from './index'

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Bienvenid@',
      },
    },
  },
  {
    navigationOptions: defaultNavigationConfig,
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#f1f1f1',
    },
  }
)

export { HomeStack }
