import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Button, Modal, Typography} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'
import {Admin} from '../../Components/auth/Allow'

import userActions from  '../../redux/user/actions'

const confirmRemove = (user, remove) => {

	const name = user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName}` : `#${user._id}`

	Modal.confirm({
		title: `Would you really want to delet this user ?`,
		content: <span>Confirm and the uyser <b>{name}</b> will be definitively deleted.</span>,
		onOk(){
			remove(user._id)
			return Promise.resolve()
		}
	});
}


export default function UserListing() {

	const loading = useSelector(state => state.User.loading || false)
	const users = useSelector(state => state.User.data || [])
	const myId = useSelector(state => state.MyProfile._id)

	const dispatch = useDispatch()
	const searchUser = () => dispatch(userActions.searchUser())
	const removeUser = () => dispatch(userActions.removeUser())

	useEffect(() => {
		searchUser()
	})

	const columns = [
		{
			title: 'Nom', dataIndex: 'firstName', key: 'firstName', render: (text, record) =>
				`${record.firstName || ''} ${record.lastName ||''}`
		},
		{ title: 'Email', dataIndex: 'login', key: 'login' },
		{
			key: 'action', className: 'models--actions', width: 110, render: (text, record) => {
				const disabled = record._id === myId ? 'disabled' : ''
				return (
					<Admin>
						<Link to={`/dashboard/user/${record._id}`} role="button">Editer</Link>
						<Button type="link" disabled={disabled} onClick={() => confirmRemove(record, removeUser)}>Supprimer</Button>
					</Admin>
				)
			}
		}
	]

	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Link to="/dashboard/user/new">create a new user</Link>
				<Typography.Title>Users</Typography.Title>

				<Table
					bordered
					pagination={false}
					dataSource={users}
					columns={columns}
					rowKey={record => record._id}
					loading={loading}
				/>

			</ContentWrapper>
		</LayoutWrapper>
	)

}
