import React, {Suspense, lazy} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux';
import DashKapp from "./Containers/App/DashKapp"

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
	<Route {...rest} render={props => isLoggedIn
		? <Component {...props} />
		: <Redirect to={{pathname: '/signin', state: {from: props.location}}}/>}
	/>
)

const Loading = () => <p>Loading...</p>

const Signin = lazy(() => import('./Containers/Pages/Signin'))

const LazySignin = () => (

	<Suspense fallback={<Loading />}>
		<Signin/>
	</Suspense>

)

const PublicRoutes = ({isLoggedIn}) => {

	return (
		<Switch>
			<Route exact path="/" component={LazySignin} />
			<Route exact path="/signin" component={LazySignin} />
			<RestrictedRoute path="/dashboard" component={DashKapp} isLoggedIn={isLoggedIn}/>
			<Redirect to="/" />
		</Switch>
	)
}

export default connect(

	// mapStateToProps
	state => ({
		isLoggedIn: true //state.Auth.get('idToken') !== null
	})

)(PublicRoutes)

