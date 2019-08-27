import {all, takeEvery, select, put, fork} from 'redux-saga/effects'

import actions from './actions'
import * as api from '../../helpers/api-user'

import {openErrorNotification, openSuccessNotification} from '../../helpers/notification'

export function* saveMyProfile(){
	yield takeEvery('SAVE_MYPROFILE', function* (){
		//console.log('[SAGA]', 'saveProfile()')

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


export default function* rootSaga(){
	yield all([
		fork(saveMyProfile)
	])
}