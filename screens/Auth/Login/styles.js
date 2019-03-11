import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
  },
  fieldsContainer: {
    padding: 30,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
})
