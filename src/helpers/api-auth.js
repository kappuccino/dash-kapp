import gql from 'graphql-tag'

import axios from './axios'
import {query} from './apollo'

export const lost = function(login){
	const date = new Date()
	const url = document.location.origin + '/?' + date.getTime()

	return axios
		.post('/lost', {login, url })
		.then(res => res.data)
}

export const reset = function(token, password){
	return axios
		.post(`/reset/${token}`, {password})
		.then(res => res.data)
}

export const login = function(login, password){
	return axios
		.post('/login', {login, password})
		.then(res => res.data)
}


export const auth = function(token){
	//console.log('[API]', 'auth', token)

	const q = gql`{
	  getUserByAuth(auth: "${token}"){
	    _id
	    auth
	    login
	    role
	    firstName
	    lastName
	  }		
	}`

	return query({
		fetchPolicy: 'network-only',
		query: q
	})
		.then(res => res.data.getUserByAuth)
		.catch(err => console.log('🔥 GRAPHQL', err))
}

export const createToken = function(){
	//console.log('[API]', 'createToken')

	return query({
			fetchPolicy: 'network-only',
			query: gql`{
		  createAuthToken{
		    token
		  }		
		}`
		},
	)
		.then(res => res.data.createAuthToken)
		.catch(err => console.log('🔥 GRAPHQL', err))

}