import React from 'react'
import {Link} from 'react-router-dom'
import {Popover, Button} from 'antd'

import {TopbarDropdownWrapper} from './Topbar.style'

export default function User(props) {

	const content = (
		<TopbarDropdownWrapper className="isoUserDropdown">
			<Link to={'/dashboard/settings'} className="isoDropdownLink">Settings</Link>
			<Button type="link" className="isoDropdownLink" onClick={props.logout}>Log out</Button>
		</TopbarDropdownWrapper>
	)

	return (
		<Popover placement="bottomRight" content={content} title={null}>
			<button>Moi</button>
		</Popover>
	)

}