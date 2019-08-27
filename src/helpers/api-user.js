import gql from 'graphql-tag'

import {query} from '../helpers/apollo'
import axios from '../helpers/axios'

export const getUsers = function(params={}){
	//console.log('[API]', 'getUsers', params)

	return query({
		fetchPolicy: 'network-only',
		variables: {
			limit: params.limit || 10,
			skip: params.skip || 0
		},
		query: gql`
			query($limit:Int, $skip:Int){
			  searchUser(limit:$limit, skip:$skip){
			    total
			    limit
			    skip 
			    data{
			      _id
			      firstName
			      lastName
			      login
			    }
			  }
		  }
		`
	})
		.then(res => res.data.searchUser)
		.catch(err => console.log('🔥 GRAPHQL', err))

}

export const getUser = function(_id){
	//console.log('[API]', 'getUser', _id)

	return query({
			fetchPolicy: 'network-only',
			query: gql`{
		  getUserById(_id: "${_id}"){
		    _id
		    login
		    role
		    firstName
		    lastName	      
		  }		
		}`
		},
	)
		.then(res => res.data.getUserById)
		.catch(err => console.log('🔥 GRAPHQL', err))
}

export const saveUser = function(user){
	//console.log('[API]', 'saveUser', user)

	return (user._id
			? axios.post(`/user/${user._id}`, user)
			: axios.put(`/user`, user)
	)
		.then(res => res.data)

}

export const removeUser = function(_id){
	//console.log('[API]', 'removeUser', _id)

	return axios.delete(`/user/${_id}`)
		.then(res => res.data)

}
