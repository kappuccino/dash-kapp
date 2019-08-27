import React from 'react'
import {connect} from "react-redux"
import {Layout, Icon} from 'antd'

import User from './User'
import {HeaderWrapper, Left, Right} from './Topbar.style'

import appAction from '../../redux/app/actions'
import authAction from '../../redux/auth/actions'

const {Header} = Layout


export function Topbar(props) {
	//const {collapsed, toggleCollapsed} = useSidebar()

	return (
		<HeaderWrapper>
			<Header>

				<Left>
					<Icon
						className="trigger"
						type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={props.toggleCollapsed}
					/>
				</Left>

				<Right>
					<User logout={props.logout} />
				</Right>


			</Header>
		</HeaderWrapper>
	)

}

export default connect(
	// mapStateToProps
	state => ({
		collapsed: state.App.collapsed
	}),

	// mapDispatchToProps
	{
		toggleCollapsed: appAction.toggleCollapsed,
		logout: authAction.logout
	}
)(Topbar)
