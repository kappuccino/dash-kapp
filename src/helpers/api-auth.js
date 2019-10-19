import gql from 'graphql-tag'

import {query} from './apollo'

const Me = `
	_id
	auth
	firstName
	lastName
	login
	role
	_avatar
	TFAenabled
`

export const lost = async function(login){

	const date = new Date()
	const url = document.location.origin + '/?' + date.getTime()

	const q = gql`
		query($login:String!, $url:String!){
		  userLost(login:$login, url:$url){
		    success
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				login,
				url
			},
			query: q
		})

		return res.data.userLost.success

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const reset = async function(token, password){

	const q = gql`
		query($token:String!, $password:String!){
		  userReset(token:$token, password:$password){
		    success
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				token,
				password
			},
			query: q
		})

		return res.data.userReset

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

	/*return axios
		.post(`/reset/${token}`, {password})
		.then(res => res.data)*/
}

export const login = async function(login, password){

	const q = gql`
		query($login:String!, $password:String!){
		  userLogin(login:$login, password:$password){
		    success
		    user{
		      ${Me}
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

export const checkTFA = async function(auth, token){

	const q = gql`
		query($auth:String!, $token:String!){
		  userCheckTFA(auth:$auth, token:$token){
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

		return res.data.userCheckTFA

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const enableTFA = async function(_id){

	const q = gql`
		query($_id:String!){
		  userEnableTFA(_id:$_id){
		    qrcode
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				_id
			},
			query: q
		})

		return res.data.userEnableTFA

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const disableTFA = async function(_id){

	const q = gql`
		query($_id:String!){
		  userDisableTFA(_id:$_id){
		    success
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				_id
			},
			query: q
		})

		return res.data.userDisableTFA.success

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const verifyTFA = async function(_id, token){

	const q = gql`
		query($_id:String! $token:String!){
		  userVerifyTFA(_id:$_id token:$token){
		    verified
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				_id,
				token
			},
			query: q
		})

		return res.data.userVerifyTFA.verified

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const magicLink = async function(login){

	const date = new Date()
	const url = document.location.origin + '/?' + date.getTime()

	const q = gql`
		query($login:String! $url:String!){
		  userMagicLink(login:$login url:$url){
		    success
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				url,
				login
			},
			query: q
		})

		return res.data.userMagicLink.success

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const magicLogin = async function(token){

	const q = gql`
		query($token:String!){
		  userMagicLogin(token:$token){
		    success
		    user{
          ${Me}
				}
		  }
	  }`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				token
			},
			query: q
		})

		return res.data.userMagicLogin

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const auth = async function(auth){
	//console.log('[API]', 'auth', auth)

	const q = gql`
		query($auth:String!){
		  getUserByAuth(auth: $auth){
				${Me}
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
