import {all, takeEvery, select, put, fork} from 'redux-saga/effects'

import actions from './actions'
import * as api from '../../helpers/api-user'
import * as authApi from '../../helpers/api-auth'

import {openErrorNotification, openSuccessNotification} from '../../helpers/notification'

const debug = false

// --

export function* saveMyProfile(){
	yield takeEvery(actions.SAVE_MYPROFILE, function* (){
		if(debug) console.log('[SAGA]', 'saveProfile()')

		let profile = yield select(state => state.MyProfile)

		try{
			const res = yield api.saveUser(profile)

			if(res.error){
				openErrorNotification(res.error)
				yield put({type: actions.SAVE_MYPROFILE_ERROR})
			}else{
				openSuccessNotification('Profil mis à jour')
				yield put({type: actions.SAVE_MYPROFILE_SUCCESS, payload: res})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SAVE_MYPROFILE_ERROR})
			openErrorNotification('@#')
		}

	})
}

export function* disableTFA(){
	yield takeEvery(actions.DISABLE_TFA, function* (){
		if(debug) console.log('[SAGA]', 'disableTFA()')

		const _id = yield select(state => state.MyProfile._id)

		try{
			const res = yield authApi.disableTFA(_id)

			if(res.error){
				yield put({type: actions.SAVE_MYPROFILE_ERROR})
			}else{
				yield put({type: actions.LOAD_MYPROFILE})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SAVE_MYPROFILE_ERROR})
			openErrorNotification('@#')
		}

	})
}

export function* loadMyProfile(){
	yield takeEvery(actions.LOAD_MYPROFILE, function* (){
		if(debug) console.log('[SAGA]', 'loadMyProfile()')

		let auth = yield select(state => state.MyProfile.auth)

		try{
			const res = yield authApi.auth(auth)

			if(res.error){
				yield put({type: actions.LOAD_MYPROFILE_ERROR})
			}else{
				yield put({type: actions.MYPROFILE_LOADED, payload: res})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SAVE_MYPROFILE_ERROR})
		}

	})
}

// --

export default function* rootSaga(){
	yield all([
		fork(saveMyProfile),
		fork(disableTFA),
		fork(loadMyProfile)
	])
}