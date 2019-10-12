import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Layout, Icon} from 'antd'

import User from './User'
import {HeaderWrapper, Left, Right} from './Topbar.style'

import appAction from '../../redux/app/actions'
import authAction from '../../redux/auth/actions'


export default function Topbar() {

	const collapsed = useSelector(state => state.App.collapsed || false)

	const dispatch = useDispatch()
	const toggleCollapsed = () => dispatch(appAction.toggleCollapsed())
	const logout = () => dispatch(authAction.logout())

	return (
		<HeaderWrapper>
			<Layout.Header>

				<Left>
					<Icon
						className="trigger"
						type={collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={toggleCollapsed}
					/>
				</Left>

				<Right>
					<User logout={logout} />
				</Right>


			</Layout.Header>
		</HeaderWrapper>
	)

}
