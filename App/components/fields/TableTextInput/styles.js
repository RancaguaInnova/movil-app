import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5'
  },
  flex: {
    flexDirection: 'row',
    padding: 10
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  label: {
    color: '#111',
    fontSize: 18
  },
  input: {
    color: '#888',
    flex: 1,
    textAlign: 'right',
    fontSize: 18
  },
  bottomLine: {
    backgroundColor: '#eee',
    width: '100%',
    height: 1,
    marginLeft: 10
  },
  errorMessage: {
    padding: 10,
    paddingTop: 0,
    color: 'red',
    textAlign: 'right'
  }
})
