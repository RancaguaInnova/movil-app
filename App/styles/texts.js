import {iOSUIKit, iOSColors} from 'react-native-typography'

export default {
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    color: iOSColors.black
  },
  titleContainer: {
    padding: 10,
    marginTop: 30
  },
  body: {
    ...iOSUIKit.bodyObject
  }
}
