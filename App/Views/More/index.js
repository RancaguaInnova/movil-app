import {createStackNavigator} from 'react-navigation'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import Main from './Main'

export default createStackNavigator(
  {
    MoreMain: {screen: Main},
    EditProfile: {screen: EditProfile},
    ChangePassword: {screen: ChangePassword}
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    initialRoute: 'Main'
  }
)
