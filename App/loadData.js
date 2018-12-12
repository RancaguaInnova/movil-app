import { Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'

export default async function() {
  const images = [require('App/assets/background.png'), require('App/assets/logo.png')]

  const imageAssets = await images.map(async image => {
    return Asset.fromModule(image).downloadAsync()
  })

  const fonts = [Ionicons.font]

  const fontAssets = fonts.map(font => {
    return Font.loadAsync(font)
  })

  return Promise.all([...imageAssets, ...fontAssets])
}
