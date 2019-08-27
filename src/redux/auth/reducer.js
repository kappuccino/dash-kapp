import {Map} from 'immutable'
import actions from './actions'

const initState = new Map({
	idToken: null,
	lostStatus: -1,
	resetStatus: -1
})

export default function authReducer(state = initState, action) {
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			//console.log('reducer LOGIN_SUCCESS idToken=', action.payload)
			return state.set('idToken', action.payload)

		case actions.LOST_SUCCESS:
			return state.set('lostStatus', 1)

		case actions.RESET_SUCCESS:
			return state.set('resetStatus', 1)

		case actions.RESET_ERROR:
			return state.set('resetStatus', 2)

		case actions.LOGOUT:
			return initState

		default:
			return state
	}
}
