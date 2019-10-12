import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Layout, Menu, Icon} from 'antd'

import appAction from '../../redux/app/actions'

import Logo from './Logo'


export default function Sidebar() {

	const collapsed = useSelector(state => state.App.collapsed || false)
	const selectedKeys = useSelector(state => state.App.selectedKeys || [])

	const dispatch = useDispatch()
	const toggleCollapsed = () => dispatch(appAction.toggleCollapsed())

	return (
		<Layout.Sider trigger={null} collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>

			<Link to="/dashboard">
				<Logo collapsed={collapsed} />
			</Link>

			<Menu theme="dark" selectedKeys={selectedKeys} mode="inline">

				<Menu.Item key="user">
					<Link to="/dashboard/user">
						<Icon type="user" />
						<span>Users</span>
					</Link>
				</Menu.Item>
			</Menu>

		</Layout.Sider>
	)

}
