import React from 'react'
import {Layout} from 'antd'
import styled from 'styled-components'

const {Content} = Layout

const Container = styled.section`
	margin: 0;
	background: #bada55;
`


export default function(props){

	return (
		<Content>
			<Container>
				{ props.children }
			</Container>
		</Content>
	)

}
