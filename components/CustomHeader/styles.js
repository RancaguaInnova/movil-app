import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

export default StyleSheet.create({
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.44,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  image: { width: 180, height: 38, resizeMode: 'contain' },
  notificationImage: { height: 25, resizeMode: 'contain' },
})
