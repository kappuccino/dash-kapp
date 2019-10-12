import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Typography, Form, Row, Col, Input, Divider, Select} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'
import {Admin} from '../../Components/auth/Allow'

import actions from  '../../redux/user/actions'
import {createManagedForm, createFormObject, filterOption, formItemLayout, passwordValidator} from '../../helpers/form'


const myFields = ['login', 'password', 'role', 'firstName', 'lastName']

const TheForm = props => {

	const {getFieldDecorator, getFieldValue} = props.form

	const handleSubmit = e => {
		e.preventDefault()

		props.form.validateFields((err, values) => {
			console.log({err, values})

			//console.log('Received values of form: ', values)
			if(!err) return props.onSubmit(values)
			//console.log('Received error of form: ', err)
		})

	}

	const passwordRequired = props._id === 'new' || !!getFieldValue('password')

	return (
		<Form onSubmit={handleSubmit}>

			<Row gutter={16}>
				<Col span={12}>

					<Form.Item label="Login / Email" {...formItemLayout}>
						{getFieldDecorator('login', {
							rules: [{
								required: true,
								message: `Email is used to log in`
							}]
						})(
							<Input/>
						)}
					</Form.Item>

					<Admin>
						<Form.Item label="Role" {...formItemLayout}>
							{getFieldDecorator('role', {
								defaultValue: 'user'
							})(
								<Select showSearch filterOption={filterOption}>
									<Select.Option value="user">User</Select.Option>
									<Select.Option value="admin">Admin</Select.Option>
									<Select.Option value="superadmin">SuperAdmin</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Admin>

				</Col>

				<Col span={12}>

					<Form.Item label="Password" {...formItemLayout}>
						{getFieldDecorator('password', {
							rules: [{
								required: passwordRequired,
								validator: (r, v, cb)  => passwordValidator(r, v, cb, passwordRequired),
								message: 'Password must be 6 caracters long minimum'
							}]
						})(
							<Input type="password" autoComplete="new-password" />
						)}
					</Form.Item>

				</Col>
			</Row>

			<Divider />

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="First name" {...formItemLayout}>
						{getFieldDecorator('firstName')(
							<Input/>
						)}
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item label="Last name" {...formItemLayout}>
						{getFieldDecorator('lastName')(
							<Input/>
						)}
					</Form.Item>
				</Col>
			</Row>

			<Button type="primary" htmlType="submit">Update</Button>

		</Form>
	)
}

const ManagedForm = createManagedForm(TheForm, myFields)

export default function UserData(props) {

	const _id = props.match.params._id
	const user = useSelector(state => state.User.single || {})

	const dispatch = useDispatch()
	const changeUser = data => dispatch(actions.changeUser(data))
	const saveUser = () => dispatch(actions.saveUser({redirect: true}))

	useEffect(() => {
		const loadUser = _id => dispatch(actions.loadUser(_id))
		const resetUser = _id => dispatch(actions.resetUser())

		if(_id === 'new'){
			resetUser()
		}else
			if(_id !== user._id){
				loadUser(_id)
			}

	}, [_id, user._id, dispatch])

	const handleSubmit = (values) => {
		changeUser(values)
		saveUser()
	}

	const fields = createFormObject(user, myFields)

	const title = _id === 'new'
		? 'New user'
		: `${user.firstName || ''} ${user.lastName || ''}`.trim() || `#${user._id}`

	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				{/*<Link to="/dashboard/user/5aafa61f8b2a5e00040343be">lionel</Link> &nbsp;
				<Link to="/dashboard/user/5a93e0262e3944e75f8f9451">ben</Link> &nbsp;*/}
				<Link to="/dashboard/user/new">Create a new user</Link>

				<Typography.Title>{title}</Typography.Title>

				<ManagedForm _id={_id} fields={fields} onSubmit={handleSubmit} />

				{/*fields
				<pre>{ JSON.stringify(fields, null, 2) }</pre>

				user
				<pre>{ JSON.stringify(user, null, 2) }</pre>*/}

			</ContentWrapper>
		</LayoutWrapper>
	)

}
