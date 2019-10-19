import gql from 'graphql-tag'

import {query} from '../helpers/apollo'
import axios from '../helpers/axios'

const debug = false

export const searchUser = async function(params={}){
	if(debug) console.log('[API]', 'getUsers', params)

	const q =  gql`
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

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				limit: params.limit || 10,
				skip: params.skip || 0
			},
			query: q
		})

		return res.data.searchUser

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const getUser = async function(_id){
	if(debug) console.log('[API]', 'getUser', _id)

	const q = gql`
		query($_id:String!){
		  getUserById(_id:$_id){
		    _id
		    login
		    role
		    firstName
		    lastName
			}
		}
	`

	try{
		const res = await query({
			fetchPolicy: 'network-only',
			variables: {
				_id
			},
			query: q
		})

		return res.data.getUserById

	} catch (err) {
		console.log('🔥 GRAPHQL', err)
	}

}

export const saveUser = async function (user) {
	if (debug) console.log('[API]', 'saveUser', user)

	let res
	if (user._id) {
		res = await axios.post(`/user/${user._id}`, user)
	} else {
		res = await axios.put(`/user`, user)
	}

	return res.data
}

export const removeUser = async function (_id) {
	if (debug) console.log('[API]', 'removeUser', _id)

	const res = await axios.delete(`/user/${_id}`)

	return res.data
}
