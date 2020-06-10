import React, { useState } from 'react'
import Navbar from './Navbar'
import Drawer from './Drawer'
import Backdrop from './Backdrop'

const Navigation = () => {
  const [toggleNav, setToggleNav] = useState(false)
  return (
    <>
      <Navbar onMenuClick={() => setToggleNav(true)}/>
      <Drawer show={toggleNav} closeNav={() => setToggleNav(false)}/>
      <Backdrop show={toggleNav} closeNav={() => setToggleNav(false)}/>
    </>
  )
}

export default Navigation
