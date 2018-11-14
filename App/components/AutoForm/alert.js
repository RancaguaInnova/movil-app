import {Alert} from 'react-native'

export default function(title, message) {
  Alert.alert('Error', message, [{text: 'OK', onPress: () => console.log('OK Pressed')}], {
    cancelable: true
  })
}
