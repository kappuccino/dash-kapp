import {Map} from 'immutable'
import actions from './actions'

const initState = new Map({
	idToken: null,
	viewTFA: false,
	lostStatus: -1,
	resetStatus: -1,
	TFAstatus: -1,
	TFAauth: null
})

export default function authReducer(state = initState, {type, payload}) {

	switch (type) {
		case actions.LOGIN_SUCCESS:
			return state.set('idToken', payload)

		case actions.LOGIN_ASK_TFA:
			return state.set('TFAstatus', 1).set('TFAauth', payload)

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
