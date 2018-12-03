import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flex: 1,
  },
  buttons: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
  },
})
