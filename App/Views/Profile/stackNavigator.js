import { defaultNavigationConfig } from 'App/components/CustomHeader/defaultNavigationConfig';
import { createStackNavigator } from 'react-navigation';
import Profile from './index';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Perfil'
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig
  }
);

export { ProfileStack };
