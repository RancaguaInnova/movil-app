import CustomHeader from './index'
import { defaultHeaderNavigationConfig } from 'App/styles/headerStyle'

const headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  ...defaultHeaderNavigationConfig,
}

const defaultRightMenu = {
  rightHeader: <Ionicons name='ios-notifications-outline' style={{ paddingRight: 10 }} size={25} />,
}

export { headerDefaultNavigationConfig, defaultRightMenu }
