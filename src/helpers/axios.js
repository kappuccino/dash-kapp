import axios from 'axios'

import {getToken} from './auth'

//const querystring = require('querystring')

/*axios.defaults.validateStatus =function (status) {
	//console.log('status', status)
	return true ///status < 500; // Reject only if the status code is greater than or equal to 500
}*/

axios.interceptors.request.use(config => {
	config.url = process.env.REACT_APP_API + config.url
	config.headers.Auth = getToken()
	return config
})

export default axios