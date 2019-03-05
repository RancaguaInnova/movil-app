import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leftIcon: {
    paddingRight: 10,
  },
})

const touchableIcons = {
  width: 50,
  height: 50,
  /* borderColor: 'red',
  borderWidth: 1, */
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export { touchableIcons }
