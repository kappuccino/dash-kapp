import React from 'react'
import { Layout } from 'antd'

import AppRouter from './AppRouter'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Content from './Content'
import Socket from './Socket'


export default function DashKapp(props) {

	return (
		<Layout style={{ minHeight: '100vh' }}>

			<Socket />

			<Sidebar />

			<Layout>

				<Topbar />

				<Content>
					<AppRouter {...props}  url={props.match.url} />
				</Content>

			</Layout>

		</Layout>
	)

}