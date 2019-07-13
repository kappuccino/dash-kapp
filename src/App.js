import React, {useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'
//import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from './redux/configStore'

import GlobalStyle from './style/Globale.style'
import theme from './style/theme'
import 'antd/dist/antd.css'

import KappRouter from './router'

import pack from '../package.json'

const store = configureStore()


// todo

/*
<LocaleProvider locale={currentAppLocale.antd}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
					<ThemeProvider theme={themes[themeConfig.theme]}>
*/


function App() {

  useEffect(() => {
    document.title = `${pack.title} ${pack.version}`
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>

          <>
            <GlobalStyle />
            <KappRouter history={history} />
          </>

        </ConnectedRouter>
      </Provider>
    </ThemeProvider>

  )

}

export default App
