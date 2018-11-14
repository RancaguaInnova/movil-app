import {StyleSheet} from 'react-native'
import {iOSUIKit, iOSColors} from 'react-native-typography'

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20
  },
  label: {
    ...iOSUIKit.caption2Object,
    color: iOSColors.gray
  },
  input: {
    ...iOSUIKit.bodyObject,
    paddingTop: 10,
    paddingBottom: 10
  }
})
