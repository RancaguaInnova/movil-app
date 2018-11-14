import { defaultNavigationConfig } from 'App/components/CustomHeader/defaultNavigationConfig';
import { createStackNavigator } from 'react-navigation';
import Directory from './index';

const DirectoryStack = createStackNavigator(
  {
    Directory: {
      screen: Directory,
      navigationOptions: {
        headerLeft: null,
        headerTitle: 'Directorio'
      }
    }
  },
  {
    navigationOptions: defaultNavigationConfig
  }
);

export { DirectoryStack };
