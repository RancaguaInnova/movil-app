/*****************************
 * ENV
 ******************************/

import Constants from 'expo-constants'
import { Platform } from 'react-native'

const ENV = {
	dev: {
		apiUrl: 'https://services.smartrancagua.com',
		apolloUrl: 'https://api.smartrancagua.com'
	},
	staging: {
		apiUrl: 'https://services.smartrancagua.com',
		apolloUrl: 'https://api.smartrancagua.com'
	},
	prod: {
		apiUrl: 'https://services.smartrancagua.com',
		apolloUrl: 'https://api.smartrancagua.com'
	}
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
	// What is __DEV__ ?
	// This variable is set to true when react-native is running in Dev mode.
	// __DEV__ is true when run locally, but false when published.
	if (__DEV__) {
		return ENV.dev
	} else if (env === 'staging') {
		return ENV.staging
	} else {
		return ENV.prod
	}
}

export default getEnvVars
