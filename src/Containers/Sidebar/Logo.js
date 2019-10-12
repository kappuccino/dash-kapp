import React from 'react'

import {LogoWrapper} from './Logo.style'

export default function Logo(props) {

	return (
		<LogoWrapper style={{color: '#FFF'}}>
			<span>{props.collapsed ? 'L' : 'LOGO'}</span>
		</LogoWrapper>

	)

}
