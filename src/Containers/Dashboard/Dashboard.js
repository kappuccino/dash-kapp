import React from 'react'
import {Typography} from 'antd'

import LayoutWrapper from '../../Components/utility/LayoutWrapper'
import ContentWrapper from '../../Components/utility/ContentWrapper'

const Title = Typography.Title

export default function Dashboard() {

	return (
		<LayoutWrapper full={true}>
			<ContentWrapper>

				<Title>h1. Ant Design</Title>
				<Title level={2}>h2. Ant Design</Title>
				<Title level={3}>h3. Ant Design</Title>
				<Title level={4}>h4. Ant Design</Title>



			</ContentWrapper>
		</LayoutWrapper>
	)

}