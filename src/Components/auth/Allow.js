import React from 'react'
import {useSelector} from 'react-redux'
import {createSelector} from 'reselect'

const getMyProfileRole = createSelector(
	state => state.MyProfile || {},
	me => me.role || ''
)

export const useAllowed = props => {
	const role = useSelector(getMyProfileRole)
	const {required} = props

	if(role === 'superadmin') return true
	if(role === 'admin' && (required === 'admin' || required === 'user')) return true

	return false
}

export const Allow = props => {
	if(useAllowed(props.required)) return props.children
	return null
}

// --

export const useSuperadmin = () => useAllowed('superadmin')
export const useAdmin = () => useAllowed('admin')

// --

export const Superadmin = (props) => {
	return <Allow required="superadmin">{props.children}</Allow>
}

export const Admin = (props) => {
	return <Allow required="admin">{props.children}</Allow>
}
