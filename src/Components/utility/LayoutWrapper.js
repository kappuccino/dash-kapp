import React from 'react'

import {LayoutContentWrapper} from './LayoutWrapper.style'

export default props => (
	<LayoutContentWrapper className={`${props.className || ''} isoLayoutContentWrapper`} {...props}>
		{props.children}
	</LayoutContentWrapper>
)
