import React, {useEffect, useState, useContext, createContext} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Input, Button} from 'antd'

import {SigninPage, ContainerWrapper, Container, Logo, FormWrapper} from './Signin.style'

import authAction from '../../redux/auth/actions'
//import {history} from '../../redux/configStore'

const LoginContext = createContext({})


function Login(props){

	const [valid, setValid] = useState(false)
	const {login, password, setLogin, setPassword, openLost} = useContext(LoginContext)
	//const {login, password} = getState()

	useEffect(() => {
		setValid(login && password)
	}, [login, password])

	const handleSubmit = e => {
		e.preventDefault()
		props.login(login, password)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="inputWrapper">
				<Input size="large" placeholder="Login" value={login} onChange={setLogin} />
			</div>

			<div className="inputWrapper">
				<Input size="large" type="password" placeholder="Mot de passe" value={password} onChange={setPassword} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button htmlType="submit" disabled={!valid}>S'identifier</Button>
			</div>

			<div className="centerComponent isoHelperWrapper">
				<Button type="link" onClick={openLost}>Mot de passe oublié</Button>
			</div>
		</form>
	)
}

function Lost(props){

	const [valid, setValid] = useState(false)
	const {login, setLogin, openLogin} = useContext(LoginContext)

	useEffect(() => {
		setValid(login)
	}, [login])

	const handleSubmit = e => {
		e.preventDefault()
		props.lost(login)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="inputWrapper">
				<Input size="large" placeholder="Login" value={login} onChange={setLogin} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button type="primary" htmlType="submit" disabled={!valid}>Nouveau mot de passe</Button>
			</div>

			<div className="centerComponent isoHelperWrapper">
				<Button type="link" onClick={openLogin}>S'identifier</Button>
			</div>
		</form>
	)
}

function Reset(props){

	const [valid, setValid] = useState(false)
	const [confirm, setConfirm] = useState('')
	const {password, token, setPassword, openLogin} = useContext(LoginContext)

	useEffect(() => {
		setValid(!!password && password === confirm && password.length >= 6)
	}, [password, confirm])

	const handleSubmit = e => {
		e.preventDefault()
		props.reset(token, password)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="inputWrapper">
				<Input type="password" size="large" placeholder="Nouveau mot de passe (6 caractères minimum)"
				       value={password} onChange={setPassword} />
			</div>

			<div className="inputWrapper">
				<Input type="password" size="large" placeholder="Confirmation"
				       value={confirm} onChange={e => setConfirm(e.target.value)} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button type="primary" htmlType="submit" disabled={!valid}>Confirmer</Button>
			</div>

			{ props.status === 1 &&
				<p>Changement de mot de passe confirmé. <Button type="link" onClick={openLogin}>identifiez-vous</Button></p>
			}

		</form>
	)
}

function SignIn(props){

	const [view, setView] = useState('login')
	const [login, setLogin] = useState('')
	const [token, setToken] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	const actions = {
		login, password, token,
		setLogin: e => setLogin(e.target.value),
		setPassword: e => setPassword(e.target.value),
		openLost: () => setView('lost'),
		openLogin: () => setView('login')
	}

	// Detect the need for a redirection
	if(!redirect && props.isLoggedIn) setRedirect(true)

	// Redirect to /dashboard
	if (redirect) return <Redirect to={{pathname: '/dashboard'}} />

	// Ask for a new password
	const query = new URLSearchParams(document.location.search)
	const qToken = query.get('token')
	if(!token && qToken){
		setToken(qToken)
		setView('new')
	}

	return (
		<SigninPage>
			<ContainerWrapper>
				<Container>

					<Logo>LOGO</Logo>

					<FormWrapper>
						<LoginContext.Provider value={actions}>
							{view === 'login' && <Login login={props.login}/>}
							{view === 'lost' && <Lost lost={props.lost}/>}
							{view === 'new' && <Reset reset={props.reset} status={props.resetStatus} />}
						</LoginContext.Provider>
					</FormWrapper>

				</Container>
			</ContainerWrapper>
		</SigninPage>
	)
}

export default connect(
	// mapStateToProps
	state => ({
		isLoggedIn: state.Auth.get('idToken') !== null,
		resetStatus: state.Auth.get('resetStatus')
	}),

	// mapDispatchToProps
	{
		login: authAction.login,
		lost: authAction.lost,
		reset: authAction.reset
	}
)(SignIn)
