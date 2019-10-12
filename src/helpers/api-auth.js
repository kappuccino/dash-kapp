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

// {g}
export const login = async function(login, password){

	const q = gql`
		query($login:String!, $password:String!){
		  userLogin(login:$login, password:$password){
		    success
		    user{
		      _id
					auth
					firstName
					lastName
					login
					role
					_avatar
					TFAenabled
		    }
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				login,
				password
			},
			query: q
		})

		return res.data.userLogin

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

// {g}
export const checkTFA = async function(auth, token){

	const q = gql`
		query($auth:String!, $token:String!){
		  checkTFA(auth:$auth, token:$token){
		    verified
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				auth,
				token
			},
			query: q
		})

		return res.data.checkTFA

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const magicLink = function(login){
	const date = new Date()
	const url = document.location.origin + '/?' + date.getTime()

	return axios
		.post('/magiclink', {login, url})
		.then(res => res.data)
}

export const magicLogin = function(token){
	return axios
		.post('/magiclogin', {token})
		.then(res => res.data)
}

// {g}
export const auth = async function(auth){
	//console.log('[API]', 'auth', auth)

	const q = gql`
		query($auth:String!){
		  getUserByAuth(auth: $auth){
				_id
				auth
				login
				role
				firstName
				lastName
	    }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				auth
			},
			query: q
		})

		return res.data.getUserByAuth

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

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