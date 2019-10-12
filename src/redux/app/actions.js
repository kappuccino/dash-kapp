const actions = {
	COLLAPSE_CHANGE: 'COLLPSE_CHANGE',

	APP_USERS_UPDATE: 'APP_USERS_UPDATE',
	APP_USERS_UPDATE_SUCCESS: 'APP_USERS_UPDATE_SUCCESS',

	toggleCollapsed: () => ({
		type: actions.COLLAPSE_CHANGE
	}),

	updateUsers : users => ({
		type: actions.APP_USERS_UPDATE,
		payload: users
	})

}

export default actions