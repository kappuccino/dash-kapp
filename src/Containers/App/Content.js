import React from 'react'
import {Layout} from 'antd'

import {Container} from './Content.style'

const {Content} = Layout




export default function(props){

	return (
		<Content>
			<Container>
				{ props.children }
			</Container>
		</Content>
	)

}
