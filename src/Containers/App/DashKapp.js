import React from 'react'
import { Layout } from 'antd'

import AppRouter from './AppRouter'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Content from './Content'




export default function DashKapp(props) {

	return (
		<Layout style={{ minHeight: '100vh' }}>

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