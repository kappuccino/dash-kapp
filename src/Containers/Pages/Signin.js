import React, {useEffect, useState, useContext, createContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Input, Button} from 'antd'

import {SigninPage, ContainerWrapper, Container, Logo, FormWrapper} from './Signin.style'

import authAction from '../../redux/auth/actions'

const LoginContext = createContext({})


function Login(props){

	const [valid, setValid] = useState(false)
	const {login, password, setLogin, setPassword, openLost} = useContext(LoginContext)

	useEffect(() => {
		setValid(login && password)
	}, [login, password])

	const handleSubmit = e => {
		e.preventDefault()
		props.login(login, password)
	}

	const handleMagicLink = e => {
		e.preventDefault()
		props.magicLink(login)
	}


	return (
		<form onSubmit={handleSubmit}>
			<div className="inputWrapper">
				<Input size="large" placeholder="Login" value={login} onChange={setLogin} />
			</div>

			<div className="inputWrapper">
				<Input size="large" type="password" placeholder="Password" value={password} onChange={setPassword} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button type="primary" htmlType="submit" disabled={!valid}>Log in</Button>
				<Button onClick={handleMagicLink}>
					Send me a link by email
				</Button>
			</div>

			<div className="centerComponent isoHelperWrapper">
				<Button type="link" onClick={openLost}>I lost my password</Button>
			</div>
		</form>
	)
}

function TFA(props){

	const [valid, setValid] = useState(false)
	const {TFAtoken, setTFAtoken} = useContext(LoginContext)

	useEffect(() => {
		setValid(TFAtoken.length === 6)
	}, [TFAtoken])

	const handleSubmit = e => {
		e.preventDefault()
		props.checkTFA(TFAtoken)
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>Two factor authentication is enabled,<br />
				please enter the verification code</p>

			<div className="inputWrapper">
				<Input size="large" placeholder="Token" value={TFAtoken} onChange={setTFAtoken} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button type="primary" htmlType="submit" disabled={!valid}>Log in</Button>
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
				<Button type="primary" htmlType="submit" disabled={!valid}>New password</Button>
			</div>

			<div className="centerComponent isoHelperWrapper">
				<Button type="link" onClick={openLogin}>I remember it, log me in !</Button>
			</div>
		</form>
	)
}

function Reset(props){

	const [valid, setValid] = useState(false)
	const [confirm, setConfirm] = useState('')
	const {password, resetToken, setPassword, openLogin} = useContext(LoginContext)

	useEffect(() => {
		setValid(!!password && password === confirm && password.length >= 6)
	}, [password, confirm])

	const handleSubmit = e => {
		e.preventDefault()
		props.reset(resetToken, password)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="inputWrapper">
				<Input type="password" size="large" placeholder="New password, 6 caracter long minimum"
				       value={password} onChange={setPassword} />
			</div>

			<div className="inputWrapper">
				<Input type="password" size="large" placeholder="Confirmation"
				       value={confirm} onChange={e => setConfirm(e.target.value)} />
			</div>

			<div className="inputWrapper isoLeftRightComponent">
				<Button type="primary" htmlType="submit" disabled={!valid}>Update my password</Button>
			</div>

			{ props.status === 1 &&
				<p>Your new password is saved.<br />
					<Button type="link" onClick={openLogin}>log in</Button></p>
			}

		</form>
	)
}

export default function SignIn(){

	const isLoggedIn = useSelector(state => state.Auth.get('idToken') !== null)
	const resetStatus = useSelector(state => state.Auth.get('resetStatus'))
	const TFAstatus = useSelector(state => state.Auth.get('TFAstatus'))

	const dispatch = useDispatch()
	const doLogin = (login, password) => dispatch(authAction.login(login, password))
	const doLost = (login) => dispatch(authAction.lost(login))
	const doReset = (token, password) => dispatch(authAction.reset(token, password))
	const checkTFA = token => dispatch(authAction.checkTFA(token))
	const sendMagicLink = login => dispatch(authAction.magicLink(login))
	const magicLogin = token => dispatch(authAction.magicLogin(token))

	const [view, setView] = useState('login')
	const [login, setLogin] = useState('')
	const [resetToken, setResetToken] = useState('')
	const [TFAtoken, setTFAtoken] = useState('')
	const [magic, setMagic] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	const actions = {
		login, password, resetToken, TFAtoken,
		setLogin: e => setLogin(e.target.value),
		setTFAtoken: e => setTFAtoken(e.target.value),
		setPassword: e => setPassword(e.target.value),
		openLost: () => setView('lost'),
		openLogin: () => setView('login'),
		openTFA: () => setView('tfa'),
	}

	// Detect the need for a redirection
	if(!redirect && isLoggedIn) setRedirect(true)
	if (redirect) return <Redirect to={{pathname: '/dashboard'}} />

	// Ask for a new password
	const query = new URLSearchParams(document.location.search)
	const qToken = query.get('token')
	if(!resetToken && qToken){
		setResetToken(qToken)
		setView('new')
	}

	// Magic Link
	const qMagic = query.get('magic')
	if(!magic && qMagic){
		setMagic(qMagic)
		magicLogin(qMagic)
	}

	// Two Factor Authentication
	if(view !== 'tfa' && TFAstatus === 1) setView('tfa')

	return (
		<SigninPage>
			<ContainerWrapper>
				<Container>

					<Logo>LOGO</Logo>

					<FormWrapper>
						<LoginContext.Provider value={actions}>
							{view === 'login' && <Login login={doLogin} magicLink={sendMagicLink} />}
							{view === 'tfa' && <TFA checkTFA={checkTFA} />}
							{view === 'lost' && <Lost lost={doLost}/>}
							{view === 'new' && <Reset reset={doReset} status={resetStatus} />}
						</LoginContext.Provider>
					</FormWrapper>

				</Container>
			</ContainerWrapper>
		</SigninPage>
	)
}