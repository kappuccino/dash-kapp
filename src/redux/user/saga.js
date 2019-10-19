import {all, takeEvery, select, put, fork} from 'redux-saga/effects'
import { history } from '../configStore'

import actions from './actions'

import * as api from '../../helpers/api-user'

import {openErrorNotification, openSuccessNotification} from '../../helpers/notification'

const debug = false

// --

export function* loadUser(){
	yield takeEvery(actions.LOAD_USER, function* ({payload}){
		if(debug) console.log('[SAGA]', 'loadUser()', payload)

		try{
			const res = yield api.getUser(payload)

			if(res.error){
				yield put({type: actions.LOAD_USER_ERROR})
			}else{
				yield put({type: actions.LOAD_USER_SUCCESS, payload: res})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.LOAD_USER_ERROR})
		}

	})
}

export function* saveUser(){
	yield takeEvery(actions.SAVE_USER, function* ({payload}){
		if(debug) console.log('[SAGA]', 'saveUser()', payload)

		const user = yield select(state => state.User.single)
		const redirect = payload.redirect || false

		try{
			const res = yield api.saveUser(user)

			if(res.error){
				openErrorNotification(res.error)
				yield put({type: actions.SAVE_USER_ERROR})
			}else{
				openSuccessNotification('User saved')
				if(redirect) return history.push(`/dashboard/user/${res._id}`)
				yield put({type: actions.LOAD_USER, payload: res._id})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SAVE_USER_ERROR})
			openErrorNotification('@#')
		}

	})
}

export function* searchUser(){


	yield takeEvery(actions.SEARCH_USER, function* (action) {
		if(debug) console.log(actions.SEARCH_USER)
		const params = action.payload || {}

		if(Object.entries(params).length){
			//console.log('update params with', params)
			yield put({type: actions.SEARCH_USER_PARAMS, payload: params})
		}

		try{
			const params = yield select(state => state.User.params)
			if(debug) console.log('params used to request users', params)
			const res = yield api.searchUser(params)

			if(res.error){
				openErrorNotification(res.error)
				yield put({type: actions.SEARCH_USER_ERROR})
			}else{
				yield put({type: actions.SEARCH_USER_SUCCESS, payload: res})
			}

		} catch(err){
			console.log('🔥', err)
			yield put({type: actions.SEARCH_USER_ERROR})
		}

	})
}

export function* removeUser(){

	yield takeEvery(actions.REMOVE_USER, function* ({payload}) {

		try{
			yield api.removeUser(payload)
			openSuccessNotification('Booker supprimé')
		} catch(e){
		}
	})

}

// --

export default function* rootSaga(){
	yield all([
		fork(loadUser),
		fork(saveUser),
		fork(removeUser),
		fork(searchUser)
	])
}
