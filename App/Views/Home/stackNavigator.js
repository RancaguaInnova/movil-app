import { defaultNavigationConfig } from 'App/components/CustomHeader/defaultNavigationConfig';
import { createStackNavigator } from 'react-navigation';
import Home from './index';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Bienvenid@'
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig
  }
);

export { HomeStack };
