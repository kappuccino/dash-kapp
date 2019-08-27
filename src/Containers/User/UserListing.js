import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Button, Modal, Typography} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'
import {Admin} from '../../Components/auth/Allow'

import userActions from  '../../redux/user/actions'

const confirmRemove = (user, remove) => {

	const name = user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName}` : `#${user._id}`

	Modal.confirm({
		title: `Voulez-vous supprimer cet utilisateur ?`,
		content: <span>En confirmant, l'utilisateur <b>{name}</b> sera supprimé définitivement.</span>,
		onOk(){
			remove(user._id)
			return Promise.resolve()
		}
	});
}


export function UserListing(props) {

	useEffect(() => {
		props.searchUser()
	})

	const columns = [
		{
			title: 'Nom', dataIndex: 'firstName', key: 'firstName', render: (text, record) =>
				`${record.firstName} ${record.lastName}`
		},
		{ title: 'Email', dataIndex: 'login', key: 'login' },
		{
			key: 'action', className: 'models--actions', width: 110, render: (text, record) => {
				const disabled = record._id === props.myId ? 'disabled' : ''
				return (
					<Admin>
						<Link to={`/dashboard/user/${record._id}`} role="button">Editer</Link>
						<Button type="link" disabled={disabled} onClick={() => confirmRemove(record, props.removeUser)}>Supprimer</Button>
					</Admin>
				)
			}
		}
	]


	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Typography.Title>Users</Typography.Title>

				<Table
					bordered
					pagination={false}
					dataSource={props.users}
					columns={columns}
					rowKey={record => record._id}
					loading={props.loading}
				/>

			</ContentWrapper>
		</LayoutWrapper>
	)

}


export default connect(
	// mapStateToProps
	state => ({
		loading: state.User.loading,
		total: state.User.total,
		users: state.User.data || [],
		myId: state.MyProfile._id
	}),

	// mapDispatchToProps
	{
		searchUser: userActions.searchUser,
		removeUser: userActions.removeUser
	}
)(UserListing)