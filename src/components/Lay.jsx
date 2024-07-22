import React from 'react'
import Navbar from './Navbar'
import TodoApp from './Home'
import Navbar2 from './Navbar2'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar2/>
        {children}
    </div>
  )
}

export default Layout