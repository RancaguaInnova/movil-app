import {StyleSheet} from 'react-native'
import texts from 'App/styles/texts'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  titleContainer: texts.titleContainer,
  title: {
    ...texts.title,
    marginBottom: 0
  },
  options: {
    marginTop: 20,
    backgroundColor: '#f5f5f5'
  },
  option: {
    padding: 10
  },
  optionNonLast: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  optionText: {
    fontSize: 18
  },
  separation: {
    height: 20
  }
})
