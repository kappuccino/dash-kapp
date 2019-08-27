import React, {lazy, useEffect, Suspense} from 'react'
import {Skeleton} from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const Loading = () => {

	useEffect(() => {
		Nprogress.start()

		return () => {
			Nprogress.done()
		}
	}, [])

	return <Skeleton />
}

export default function LazyComponent(importComponent, props) {
	const Next = lazy(importComponent)

	return (
		<Suspense fallback={<Loading />}>
			<Next {...props} />
		</Suspense>
	)

}
