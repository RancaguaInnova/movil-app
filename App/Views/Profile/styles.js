import { StyleSheet } from 'react-native'
import texts from 'App/styles/texts'

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...texts.title
  },
  title: {
    ...texts.title,
    marginBottom: 80
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16
  },
  register: {
    marginTop: 20
  }
})
