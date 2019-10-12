const actions = {
	CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
	MAGIC_LINK: 'MAGIC_LINK',
	MAGIC_LOGIN: 'MAGIC_LOGIN',

	LOGIN_REQUEST: 'LOGIN_REQUEST',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR',

	LOGIN_ASK_TFA: 'LOGIN_ASK_TFA',

	LOGIN_CHECK_TFA: 'LOGIN_CHECK_TFA',
	LOGIN_CHECK_TFA_ERROR: 'LOGIN_CHECK_TFA_ERROR',

	LOGOUT: 'LOGOUT',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
	LOGOUT_ERROR: 'LOGOUT_ERROR',

	LOST_REQUEST: 'LOST_REQUEST',
	LOST_SUCCESS: 'LOST_SUCCESS',
	LOST_ERROR: 'LOST_ERROR',

	RESET_REQUEST: 'RESET_REQUEST',
	RESET_SUCCESS: 'RESET_SUCCESS',
	RESET_ERROR: 'RESET_ERROR',

	// --

	checkAuthorization: () => ({
		type: actions.CHECK_AUTHORIZATION
	}),

	login: (login, password) => ({
		type: actions.LOGIN_REQUEST,
		payload: {login, password}
	}),

	lost: (login) => ({
		type: actions.LOST_REQUEST,
		payload: {login}
	}),

	reset: (token, password) => ({
		type: actions.RESET_REQUEST,
		payload: {token, password}
	}),

	logout: () => ({
		type: actions.LOGOUT
	}),

	magicLink: login => ({
		type: actions.MAGIC_LINK,
		payload: {login}
	}),

	magicLogin: token => ({
		type: actions.MAGIC_LOGIN,
		payload: token
	}),

	checkTFA: token => ({
		type: actions.LOGIN_CHECK_TFA,
		payload: token
	})
}

export default actions