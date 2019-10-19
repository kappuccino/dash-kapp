import {all, takeEvery, select, put, fork} from 'redux-saga/effects'

import * as api from '../../helpers/api-auth'
import crypto from '../../helpers/crypto'

import {getToken, setToken, clearToken, saveProfile, clearProfile} from '../../helpers/auth'
import {openErrorNotification, openSuccessNotification} from '../../helpers/notification'

import actions from './actions'
import profileActions from '../myprofile/actions'

const debug = false

// --

export function* loginRequest() {
	//if(debug) console.log('loginRequest()')

	yield takeEvery(actions.LOGIN_REQUEST, function* (action) {
		const {login, password} = action.payload

		try {
			const res = yield api.login(login, password)
			if(debug) console.log('login res => ', login, password, res)

			if (res.success) {
				if(debug) console.log('==> LOGIN_SUCCESS')

				if(res.user.TFAenabled){
					if(debug) console.log('Ask for TFA')
					yield put({type: actions.LOGIN_ASK_TFA, payload: res.user.auth})
				}else {
					yield put({type: actions.LOGIN_SUCCESS, payload: res.user.auth})
				}
			} else {
				openErrorNotification('Mauvais identifiant ou mot de passe')
				yield put({type: actions.LOGIN_ERROR})
			}

		} catch (e) {
			yield put({type: actions.LOGIN_ERROR})
		}

	})
}

export function* checkTFA() {
	//if(debug) console.log('loginRequest()')

	yield takeEvery(actions.LOGIN_CHECK_TFA, function* ({payload}) {

		try {
			const auth = yield select(state => state.Auth.get('TFAauth'))
			const res = yield api.checkTFA(auth, payload)
			if(debug) console.log('res => ', res)

			if (res.verified) {
				if(debug) console.log('==> LOGIN_CHECK_TFA_SUCCESS')
				yield put({type: actions.LOGIN_SUCCESS, payload: auth})
			} else {
				openErrorNotification('Token not valid')
				yield put({type: actions.LOGIN_CHECK_TFA_ERROR})
			}

		} catch (e) {
			yield put({type: actions.LOGIN_CHECK_TFA_ERROR})
		}

	})
}

export function* magicLinkRequest() {
	//if(debug) console.log('loginRequest()')

	yield takeEvery(actions.MAGIC_LINK, function* ({payload}) {
		const {login} = payload

		try {
			const res = yield api.magicLink(login)
			if(debug) console.log('magic link res => ', login, res)

			openSuccessNotification('Check your mail inbox')

		} catch (e) {
			yield put({type: actions.LOGIN_ERROR})
		}

	})
}

export function* magicLogin() {
	//if(debug) console.log('loginLogin()')

	yield takeEvery(actions.MAGIC_LOGIN, function* ({payload}) {
		try {
			const res = yield api.magicLogin(payload)
			if(debug) console.log('magiclogin res => ', res)

			if (res.success) {
				if(debug) console.log('==> MAGIC LOGIN SUCCESS')
				yield put({type: actions.LOGIN_SUCCESS, payload: res.user.auth})
			} else {
				openErrorNotification('Magic link failed')
			}

		} catch (e) {
			yield put({type: actions.LOGIN_ERROR})
		}

	})
}

export function* lostRequest() {
	yield takeEvery(actions.LOST_REQUEST, function* ({payload}) {
		const {login} = payload

		try {
			const res = yield api.lost(login)
			if(res) {
				openSuccessNotification('Process sent by email')
				yield put({type: actions.LOST_SUCCESS})
			}else {
				yield put({type: actions.LOST_ERROR})
			}

		} catch (e) {
			yield put({type: actions.LOST_ERROR})
		}

	})
}

export function* resetRequest() {
	yield takeEvery(actions.RESET_REQUEST, function* ({payload}) {
		const {token, password} = payload

		try {
			const res = yield api.reset(token, password)
			res.success
				? yield put({type: actions.RESET_SUCCESS})
				: yield put({type: actions.RESET_ERROR})
		} catch (e) {
			yield put({type: actions.RESET_ERROR})
		}

	})
}

export function* loginSuccess() {
	yield takeEvery(actions.LOGIN_SUCCESS, function* (action) {
		if(debug) console.log('login success !!!!', action)
		yield setToken(action.payload)
		yield loadProfile(action.payload)
	})
}

export function* loginError() {
	yield takeEvery(actions.LOGIN_ERROR, function* () {
	})
}

export function* logout() {
	yield takeEvery(actions.LOGOUT, function* () {
		clearToken()
		clearProfile()
		yield put({type: actions.LOGOUT_SUCCESS})
	})
}

export function* checkAuthorization() {
	yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
		const token = getToken()
		if(debug) console.log('saga CHECK_AUTHORIZATION', {token})

		if (!token) return

		yield put({type: actions.LOGIN_SUCCESS, payload: token})
	})
}

function* loadProfile(token) {
	if(debug) console.log('🌷🌷 loadProfile()', token)

	const res = yield api.auth(token)
	if(debug) console.log('🍕🍕 profile loaded', res)

	if (res.auth === token) {
		if(debug) console.log('🦄 Token matches Profile.auth => good to go')

		const hashed = crypto.encrypt(JSON.stringify(res))
		yield saveProfile(hashed)

		yield put({type: profileActions.MYPROFILE_LOADED, payload: res})
	} else {
		if(debug) console.log('🤔 Token ≠ Profile.auth')
		yield put({type: actions.LOGOUT})
	}

}

// --

export default function* rootSaga() {
	yield all([
		fork(checkAuthorization),
		fork(loginRequest),
		fork(magicLinkRequest),
		fork(magicLogin),
		fork(checkTFA),
		fork(lostRequest),
		fork(resetRequest),
		fork(loginSuccess),
		fork(loginError),
		fork(logout)
	])
}
