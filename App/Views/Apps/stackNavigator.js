import { defaultNavigationConfig } from 'App/components/CustomHeader/defaultNavigationConfig';
import { createStackNavigator } from 'react-navigation';
import Apps from './index';

const AppsStack = createStackNavigator(
  {
    Apps: {
      screen: Apps,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Trámites'
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig
  }
);

export { AppsStack };
