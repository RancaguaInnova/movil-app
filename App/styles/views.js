import {StyleSheet} from 'react-native'
import texts from './texts'

export default StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...texts.title
  }
})
