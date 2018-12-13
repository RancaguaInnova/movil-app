import { getSession } from 'App/Root/client'

export default async function () {
  try {
    const { userId, publicKey, secretKey } = await getSession()
    return userId && publicKey && secretKey
  } catch (error) {
    console.log('Error in isLoggedIn:', error)
  }
  return false
}
