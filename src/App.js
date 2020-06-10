import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { store } from './redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './style'
import { Navigation } from './modules'

const Home = lazy(() => import ('./modules/home'))
const Add = lazy(() => import ('./modules/add'))
const Update = lazy(() => import ('./modules/update'))

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navigation />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route exact path='/add'>
                <Add/>
              </Route>
              <Route exact path='/update/:id'>
                <Update/>
              </Route>
            </Switch>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
