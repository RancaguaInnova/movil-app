import AppLink from 'react-native-app-link'
const openApp = async app => {
  const { urlApp, appName, appStoreId, appStoreLocale, playStoreId } = app
  try {
    await AppLink.maybeOpenURL(urlApp, {
      appName,
      appStoreId,
      appStoreLocale,
      playStoreId,
    })
  } catch (error) {
    try {
      await AppLink.openInStore({
        appName,
        appStoreId,
        appStoreLocale,
        playStoreId,
      })
    } catch (error) {}
  }
}
export default openApp
