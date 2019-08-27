import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Button, Form, Input, Typography} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'

import {mapPropsToFields, createFormObject, passwordValidator} from '../../helpers/form'
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

	return (
		<Form onSubmit={handleSubmit}>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="First name">
						{getFieldDecorator('firstName')(
							<Input/>
						)}
					</Form.Item>
				</Col>


				<Col span={12}>
					<Form.Item label="Last name">
						{getFieldDecorator('lastName')(
							<Input/>
						)}
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Password">
						{getFieldDecorator('password', {
							rules: [{
								required: !!getFieldValue('password'),
								validator: passwordValidator,
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

const ManagedForm = Form.create({
	/*onFieldsChange(props, changedFields) {
		props.onChange(changedFields)
	},*/

	mapPropsToFields(props) {
		return mapPropsToFields(props, myFields)
	},

	onValuesChange(props, changedValues, allValues) {
		//console.log('onValuesChange', {props, changedValues, allValues})
		props.onChange(changedValues)
	},
})(TheForm)

const Settings = (props) => {

	const handleChange = (values) => {
		//console.log('handleChange', values)
	}

	const handleSubmit = (values) => {
		console.log('handleSubmit()', values)
		props.changeMyProfile(values)
		props.saveMyProfile(values)
	}

	const fields = createFormObject(props.myProfile, myFields)

	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Title>Mon Compte</Title>

				<ManagedForm fields={fields} onSubmit={handleSubmit} onChange={handleChange} />

				<pre>{JSON.stringify(props.myProfile, null, 2)}</pre>

			</ContentWrapper>
		</LayoutWrapper>
	)
}

export default connect(
	// mapStateToProps
	state => ({
		myProfile: state.MyProfile
	}),

	// mapDispatchToProps
	{
		changeMyProfile: actions.changeMyProfile,
		saveMyProfile: actions.saveMyProfile
	}
)(Settings)

