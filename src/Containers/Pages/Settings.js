import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Button, Form, Input, Typography} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'

import {createFormObject, passwordValidator, createManagedForm, formItemLayout} from '../../helpers/form'
import actions from '../../redux/myprofile/actions'

const Title = Typography.Title

const myFields = ['firstName', 'lastName', 'password']


const TheForm = props => {

	const {getFieldDecorator, getFieldValue} = props.form

	const handleSubmit = e => {
		e.preventDefault()

		props.form.validateFields((err, values) => {
			//console.log('Received values of form: ', values)
			if(!err) return props.onSubmit(values)
			//console.log('Received error of form: ', err)
		})

	}

	const passwordRequired = !!getFieldValue('password')

	return (
		<Form onSubmit={handleSubmit}>

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

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Password" {...formItemLayout}>
						{getFieldDecorator('password', {
							rules: [{
								required: passwordRequired,
								validator: (r, v, cb)  => passwordValidator(r, v, cb, passwordRequired),
								message: 'Password must be 6 characters long minimum'
							}]
						})(
							<Input type="password" placeholder="Leave empty to keep your password unchanged"/>
						)}
					</Form.Item>
				</Col>
			</Row>

			<Button type="primary" htmlType="submit">Update my profile</Button>

		</Form>
	)
}

const ManagedForm = createManagedForm(TheForm, myFields)

export default function Settings(){

	const myProfile = useSelector(state => state.MyProfile)

	const dispatch = useDispatch()
	const changeMyProfile = values => dispatch(actions.changeMyProfile(values))
	const saveMyProfile = values => dispatch(actions.saveMyProfile(values))

	const handleChange = (values) => {
		//console.log('handleChange', values)
	}

	const handleSubmit = (values) => {
		//console.log('handleSubmit()', values)
		changeMyProfile(values)
		saveMyProfile(values)
	}

	const fields = createFormObject(myProfile, myFields)

	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Title>My Settings</Title>

				<ManagedForm fields={fields} onSubmit={handleSubmit} onChange={handleChange} />

			</ContentWrapper>
		</LayoutWrapper>
	)
}
