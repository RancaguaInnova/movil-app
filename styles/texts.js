import { iOSUIKit, iOSColors } from 'react-native-typography'

export default {
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    color: iOSColors.black,
  },
  titleContainer: {
    padding: 10,
    marginTop: 30,
  },
  body: {
    ...iOSUIKit.bodyObject,
  },
  rowSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowText: {
    fontSize: 14,
  },
  rowCaption: {
    fontSize: 12,
  },
}
