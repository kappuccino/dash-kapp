import crypto from '../../helpers/crypto'
import actions from './actions'

const hashed = crypto.decrypt(localStorage.getItem('models')) || ''
let initState = {}

try{
	initState = JSON.parse(hashed)
} catch (err) {
	//
}

export default function myProfileReducer(state = initState, action) {

	const {type, payload} = action

	switch (type) {

		case actions.MYPROFILE_LOADED:
			return payload

		case action.MYPROFILE_UNLOAD:
			return {}

		case actions.SAVE_MYPROFILE_SUCCESS:
			return {...state, password: null}

		default:
			return state
	}
}
