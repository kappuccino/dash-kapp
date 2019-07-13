import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom"


function SignIn(props) {

	const [redirect, setRedirect] = useState(false)

	useEffect(() => {

		console.log('PROPS', props)

	}, [props])

	const handleLogin = () => {
		setRedirect('/dashboard')
	}

	if(redirect) return <Redirect to={{pathname: redirect}}/>

	return (
		<>
			<h1>Sign in page</h1>
			<button onClick={handleLogin}>login</button>
		</>
	)
}


export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: true
	}),

	// mapDispatchToProps
	{}
)(SignIn)