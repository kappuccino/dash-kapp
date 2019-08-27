import actions from './actions'

const initState = {
	collapsed: false
}

export default function appReducer(state = initState, action) {

	switch (action.type) {
		case actions.COLLAPSE_CHANGE:
			return {...state, collapsed: !state.collapsed}

		default:
			return state
	}


}
