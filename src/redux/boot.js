import authActions from './auth/actions'

export default store =>
	new Promise(() => {
		store.dispatch(authActions.checkAuthorization())
	})