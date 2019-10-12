import React from 'react';
import {Switch, Route} from 'react-router-dom'

import LazyComponent from '../../helpers/LazyComponent'

export default function AppRouter({url}) {
	return (
		<Switch>
			<Route exact path={`${url}/`} render={props => LazyComponent(() => import('../Dashboard/Dashboard'), props)}/>
			<Route exact path={`${url}/settings`} render={props => LazyComponent(() => import('../Pages/Settings'), props)}/>

			<Route exact path={`${url}/user`} render={props => LazyComponent(() => import('../User/UserListing'), props)}/>
			<Route path={`${url}/user/:_id`} render={props => LazyComponent(() => import('../User/UserData'), props)}/>

		</Switch>
	)
}