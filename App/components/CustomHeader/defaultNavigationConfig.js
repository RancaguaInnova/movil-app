import CustomHeader from './index'
import { defaultHeaderNavigationConfig } from 'App/styles/headerStyle';

const headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  ...defaultHeaderNavigationConfig
};

export { headerDefaultNavigationConfig };
