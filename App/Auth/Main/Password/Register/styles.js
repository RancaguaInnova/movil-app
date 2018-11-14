import {StyleSheet} from 'react-native'
import texts from 'App/styles/texts'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    ...texts.title,
    marginBottom: 80
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16
  }
})
