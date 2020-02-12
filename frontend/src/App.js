import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import AuthPage from './pages/authPage'
import BookingPage from './pages/bookingPage'
import EventPage from './pages/eventPage'
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <MainNavigation/>
    <main class="main-content">
    <Switch>
      <Redirect from="/" to="/auth" exact/>
      <Route path='/auth'  component={AuthPage}/>
      <Route path='/booking' component={BookingPage}/>
      <Route path='/event' component={EventPage}/>
    </Switch>
    </main>
    
  </BrowserRouter>
  );
}

export default App;
