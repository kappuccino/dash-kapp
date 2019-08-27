import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import {getToken} from './auth'

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_API + '/graphql'
})

const authLink = setContext((_, { headers }) => {
	//console.log('setContext header Auth:', getToken())

	return {
		headers: {
			...headers,
			Auth : getToken() || ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

export const query = client.query

