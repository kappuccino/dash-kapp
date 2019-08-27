import actions from './actions'

const initState = {
	single: {},
	loading: false,
	total: 0,
	params: {
		limit: 200,
		skip: 0,
	},
	data: []
}

export default function userReducer(state = initState, action) {

	const {payload} = action

	switch (action.type) {

		case actions.LOAD_USER_SUCCESS:
			return {
				...state,
				single: payload
			}

		case actions.CHANGE_USER:
			return {
				...state,
				single: {
					...state.single,
					...payload
				}
			}

		case actions.RESET_USER:
			return {
				...state,
				single: {}
			}

		case actions.SEARCH_USER_PARAMS:
			return {
				...state,
				params: {
					...state.params,
					...payload
				}
			}

		case actions.SEARCH_USER_SUCCESS:
			return {
				...state,
				total: payload.total,
				data: payload.data
			}

		case actions.REMOVE_USER:
			return {
				...state,
				data: state.data.filter(d => d._id !== payload)
			}

		default:
			return state
	}
}
