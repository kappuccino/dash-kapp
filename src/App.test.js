import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'

afterEach(cleanup)

test('App should render', () => {
	const {getByText} = render(<App />)

	expect(getByText('Hello, world!')).toBeTruthy()


})