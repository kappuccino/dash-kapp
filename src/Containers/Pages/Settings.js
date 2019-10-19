import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Button, Form, Input, Typography, Modal, message, Popconfirm} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'

import {createFormObject, passwordValidator, createManagedForm, formItemLayout} from '../../helpers/form'
import {enableTFA, verifyTFA} from '../../helpers/api-auth'
import actions from '../../redux/myprofile/actions'

const Title = Typography.Title

const myFields = ['firstName', 'lastName', 'password']

const TheForm = props => {

	const {getFieldDecorator, getFieldValue} = props.form

	const _id = useSelector(state => state.MyProfile._id)
	const TFAenabled = useSelector(state => state.MyProfile.TFAenabled)

	const dispatch = useDispatch()
	const loadMyProfile = () => dispatch(actions.loadMyProfile())
	const disableTFA = () => dispatch(actions.disableTFA())

	const [TFAvisible, setTFAvisible] = useState(false)
	const [QRcode, setQRcode] = useState(null)
	const [token, setToken] = useState('')
	const [verifying, setVerifying] = useState(false)

	const openTFAmodal = async () => {
		// Reset
		setTFAvisible(true)
		setToken('')
		setVerifying('')

		const res = await enableTFA(_id)
		setQRcode(res.qrcode)
	}

	const closeTFAmodal = () => {
		setTFAvisible(false)
	}

	const doVerifyTFA = async () => {
		setVerifying(true)

		const verified = await verifyTFA(_id, token)
		setVerifying(true)

		if(verified){
			message.success('OK')
			closeTFAmodal()
			loadMyProfile()
		}else {
			message.error('Pas OK')
		}

	}

	const hToken = e => setToken(e.target.value)

	const hSubmit = e => {
		e.preventDefault()

		props.form.validateFields((err, values) => {
			//console.log('Received values of form: ', values)
			if(!err) return props.onSubmit(values)
			//console.log('Received error of form: ', err)
		})

	}

	const passwordRequired = !!getFieldValue('password')

	return (
		<Form onSubmit={hSubmit}>

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

			{TFAenabled &&
				<Popconfirm
					title="Are you sure to disable Two Factor Authentication"
					onConfirm={disableTFA}
					okText="Yes"
					cancelText="No"
				>
					<Button type="default">Disable two factor authentication</Button>
				</Popconfirm>
			}

			{!TFAenabled &&
				<Button type="default" onClick={openTFAmodal}>Activate two factor authentication</Button>
			}

			<br />
			<br />

			<Button type="primary" htmlType="submit">Update my profile</Button>

			<Modal
				title="Enable Two Factor Authentication"
				visible={TFAvisible}
				onCancel={closeTFAmodal}
				footer={[
					<Button key="cancel" onClick={closeTFAmodal}>Cancel</Button>,
					<Button key="verify" type="primary" icon={verifying ? 'loading' : null}
					        onClick={doVerifyTFA}>Verify</Button>
				]}
			>

				{QRcode && <img src={QRcode} alt="qrcode"/>}

				<Input value={token} onChange={hToken} />

			</Modal>

		</Form>
	)
}

const ManagedForm = createManagedForm(TheForm, myFields)

export default function Settings(){

	const myProfile = useSelector(state => state.MyProfile)

	const dispatch = useDispatch()
//const changeMyProfile = values => dispatch(actions.changeMyProfile(values))
	const saveMyProfile = values => dispatch(actions.saveMyProfile(values))

	const handleChange = (values) => {
		//console.log('handleChange', values)
	}

	const handleSubmit = (values) => {
	//console.log('handleSubmit()', values)
	//changeMyProfile(values)
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
