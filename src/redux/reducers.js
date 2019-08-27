import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import App from './app/reducer'
import Auth from './auth/reducer'
import MyProfile from './myprofile/reducer'

import User from './user/reducer'

export default (history) => combineReducers({
	App,
	Auth,
	MyProfile,
	User,

	router: connectRouter(history)
})