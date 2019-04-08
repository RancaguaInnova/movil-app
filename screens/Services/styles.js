import { StyleSheet } from 'react-native'
import texts from './../../styles/texts'

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  text: {
    ...texts.title,
  },
  leftIcon: {
    paddingRight: 10,
  },
})
