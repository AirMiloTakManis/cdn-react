import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AccountCircle, Home, AccountTree } from '@mui/icons-material'
import { Sling as Hamburger } from 'hamburger-react'

export default function MenuBar() {
  const [showNav, setShowNav] = useState(false)

  const toggleNavItems = () => {
    setShowNav(!showNav)
  }
  return (
      <div className="menubar">
        <div className="container">
        <div className="menu-icon">
          <Hamburger size={24} direction="right" duration={0.3} rounded toggled={showNav} toggle={setShowNav} />
        </div>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'black', display: "flex", alignItems: 'center' }}>
          <AccountTree style={{ color: 'var(--primary-color)', fontSize: 56 }} />
          &nbsp;
          <span style={{ fontSize: 20, fontWeight: 600 }}>Complete Developer Network</span>
        </NavLink>
        <div className={`nav-elements ${showNav && 'active'}`}>
          <ul>
            {[
              {
                text: 'Home',
                link: '/',
                class: "home",
                icon: <Home style={{ width: 20 }}/>
              },
              {
                text: 'Me',
                link: '/profile-page',
                class: 'dealerships',
                icon: <AccountCircle style={{ width: 20 }} />
              }
            ].map((d, index) => (
                <NavLink key={index} to={d.link} className="hover-active">
                  <li
                    onClick={toggleNavItems}
                    style={{ marginInline: 20 }}
                    >
                    {d.icon}
                    &nbsp;
                    <span>{d.text}</span>
                  </li>
                </NavLink>
              ))}
          </ul>
        </div>
      </div>

      </div>
      
  )
}
