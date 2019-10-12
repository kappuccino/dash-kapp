import React from 'react'
import {Typography} from 'antd'
import {useSelector} from 'react-redux'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'

const Title = Typography.Title

export default function Dashboard() {

	const allUsers = useSelector(state => state.App.users)


	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Title>Dashboard</Title>

				<pre>{ JSON.stringify(allUsers, null, 2) }</pre>


			</ContentWrapper>
		</LayoutWrapper>
	)

}