import React, { useState, useEffect } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
import Button from '@material-ui/core/Button'
import { Home, LibraryBooks } from '@material-ui/icons'
import { fetchAllData, fetchGuestData } from './helpers/fetchData'
import MenuAppBar from './components/MenuAppBar'
import Table from './components/Table'
import NewOrder from './components/NewOrder'
import Login from './components/Login'
import './App.css'
import Cookies from 'js-cookie'

export default function App (props) {
  const [state, setState] = useState('')
  const [auth, setAuth] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    window.onload = () => {
      if (!Cookies.get('user') && window.gapi.auth2) {
        console.log(`Data refresh on window fully loaded...`)
        window.gapi.auth2.getAuthInstance().then(GoogleAuth => {
          const GoogleUser = GoogleAuth.currentUser.get()
          if (GoogleUser.isSignedIn()) {
            console.log('check if user is signed in:')
            console.log(GoogleUser.isSignedIn())
            console.log('user email:')
            console.log(GoogleUser.getBasicProfile().getEmail())
            setAuth({
              user: GoogleUser.getBasicProfile().getGivenName(),
              email: GoogleUser.getBasicProfile().getEmail()
            })
            fetchAllData(setState, GoogleUser.getAuthResponse().id_token)
          } else {
            console.log(`No login user`)
          }
        })
      } else {
        console.log('error')
      }
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('user')) {
      console.log(`Guest user login`)
      setAuth({
        user: Cookies.get('user'),
        email: Cookies.get('email')
      })
      fetchGuestData(setState)
    }
    if (!Cookies.get('user') && window.gapi.auth2) {
      console.log(`Data refreshing...`)
      window.gapi.auth2.getAuthInstance().then(GoogleAuth => {
        const GoogleUser = GoogleAuth.currentUser.get()
        console.log(GoogleUser.isSignedIn())
        if (GoogleUser.isSignedIn()) {
          console.log(`Google user sign in detected...`)
          setAuth({
            user: GoogleUser.getBasicProfile().getGivenName(),
            email: GoogleUser.getBasicProfile().getEmail()
          })
          fetchAllData(setState, GoogleUser.getAuthResponse().id_token)
        }
      })
    }
  }, [refresh])

  return (
    <div className='App'>
      <Router history={history}>
        <MenuAppBar auth={auth} setAuth={setAuth} setRefresh={setRefresh} />
        <div id='main'>
          <div id='nav_button'>
            <Link to='/'>
              <Button id='HomeButton' variant='contained' color='default'>
                <Home id='HomeIcon' />
                Home
              </Button>
            </Link>
            <Link to='/lists'>
              <Button
                id='LibraryBooksButton'
                variant='contained'
                color='secondary'
              >
                <LibraryBooks id='LibraryBooksIcon' />
                Full List
              </Button>
            </Link>
            <hr />
            <Route
              exact
              path='/'
              render={() => (
                <Login
                  auth={auth}
                  setAuth={setAuth}
                  setRefresh={setRefresh}
                  data={state}
                />
              )}
            />
            <Route
              exact
              path='/lists'
              render={() =>
                auth.email && (
                  <Table
                    orders={state.orders}
                    items={state.items}
                    setRefresh={setRefresh}
                  />
                )
              }
            />
            <Route
              exact
              path='/new'
              render={() =>
                auth.email && <NewOrder auth={auth} setRefresh={setRefresh} />
              }
            />
          </div>
        </div>
      </Router>
    </div>
  )
}
