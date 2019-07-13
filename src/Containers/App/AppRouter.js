import React from 'react';
import {Switch, Route} from 'react-router-dom'

import LazyComponent from '../../helpers/LazyComponent'

export default function({url}){

	return (
		<Switch>
			<Route exact path={`${url}/`} component={LazyComponent(() => import('../Dashboard/Dashboard'))} />
		</Switch>
	)

}
