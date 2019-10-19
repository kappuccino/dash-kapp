import {all, fork, select, put, takeEvery} from 'redux-saga/effects'

import actions from './actions'

// --

export function* usersUpdated(){
	yield takeEvery(actions.APP_USERS_UPDATE, function* ({payload}) {

		const profile = yield select(state => state.MyProfile._id)

		const nextPayload = payload.map(u => {
			u.isMe = u._id === profile
			u.name = `${u.firstName || ''} ${u.lastName || ''}`.trim()
			return u
		})

		yield put({type: actions.APP_USERS_UPDATE_SUCCESS, payload: nextPayload})

	})
}

// --

export default function* rootSaga(){
	yield all([
		fork(usersUpdated)
	])
}