import {all} from 'redux-saga/effects'

import App from './app/saga'
import Auth from './auth/saga'
import MyProfile from './myprofile/saga'

import User from './user/saga'


export default function* rootSaga() {
	yield all([
		App(),
		Auth(),
		MyProfile(),

		User()
	])
}
