const actions = {
	LOAD_USER: 'LOAD_USER',
	LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
	LOAD_USER_ERROR: 'LOAD_USER_ERROR',

	SAVE_USER: 'SAVE_USER',
	SAVE_USER_ERROR: 'SAVE_USER_ERROR',

	CHANGE_USER: 'CHANGE_USER',
	RESET_USER: 'RESET_USER',

	REMOVE_USER: 'REMOVE_USER',

	SEARCH_USER: '  SEARCH_USER',
	SEARCH_USER_PARAMS: ' SEARCH_USER_PARAMS',
	SEARCH_USER_SUCCESS: '  SEARCH_USER_SUCCESS',
	SEARCH_USER_ERROR: '  SEARCH_USER_ERROR',

	loadUser: _id => ({
		type: actions.LOAD_USER,
		payload: _id
	}),

	changeUser: data => ({
		type: actions.CHANGE_USER,
		payload: data
	}),

	resetUser: () => ({
		type: actions.RESET_USER
	}),

	saveUser: params => ({
		type: actions.SAVE_USER,
		payload: params
	}),

	searchUser: (params={}) => ({
		type: actions.SEARCH_USER,
		payload: params
	}),

	removeUser: _id => ({
		type: actions.REMOVE_USER,
		payload: _id
	})

}

export default actions