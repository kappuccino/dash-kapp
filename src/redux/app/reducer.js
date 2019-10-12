import {getConfig, setConfig} from '../../helpers/local-config'
import actions from './actions'

function getDefaultPath() {

	if (window && window.location.pathname) {
		const routes = window.location.pathname.replace('/dashboard', '').split('/')
		if (routes.length > 1) return routes
	}

	return []
}

const initState = {
	collapsed: getConfig('sideBarCollapsed', false),
	selectedKeys: getDefaultPath(),
	users: []
}

export default function appReducer(state = initState, action) {

	switch (action.type) {

		case "@@router/LOCATION_CHANGE":
			return {
				...state,
				selectedKeys: getDefaultPath()
			}

		case actions.COLLAPSE_CHANGE:
			setConfig('sideBarCollapsed', !state.collapsed)

			return {
				...state,
				collapsed: !state.collapsed
			}

		case actions.APP_USERS_UPDATE_SUCCESS:
			return {
				...state,
				users: action.payload
			}

		default:
			return state
	}


}
