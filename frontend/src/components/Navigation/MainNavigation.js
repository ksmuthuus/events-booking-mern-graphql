import React from 'react'
import {NavLink} from 'react-router-dom'

import './MainNavigation.css'

const mainNavigation = props => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Event</h1>
      </div>

      <nav className="main-navigation__item">
        <ul>
        <li><NavLink to="/auth">Auth</NavLink></li>     
        <li><NavLink to="/booking">Booking</NavLink></li>    
        <li><NavLink to="/event">Events</NavLink></li>  
        </ul>
      </nav>
    </header>
  )
}

export default mainNavigation