import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MenuButton } from '../../components'

const Navbar = ({ toggleNav, onMenuClick }) => {
  const location = useLocation()
  return (
    <NavbarContainer>
      <MenuButtonWrapper>
        <MenuButton onClick={onMenuClick}/>
      </MenuButtonWrapper>
      <RouteName>{parseRoute(location.pathname)}</RouteName>
    </NavbarContainer>
  )
}

const parseRoute = pathname => {
  if (pathname === '/') {
    return 'Home'
  }
  if (pathname === '/add') {
    return 'Add note'
  }
  if (pathname.startsWith('/update')) {
    return 'Update note'
  }
  return ''
}

const NavbarContainer = styled.div`
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  padding: 8px 10px 8px 0px;
  background-color: ${props => props.theme.color.primary};
  width: 100%;
  z-index: 5;
`

const MenuButtonWrapper = styled.div`
  width: 54px;
  min-width: 50px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`

const RouteName = styled.div`
  margin-left: 8px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  min-width: max-content;
`

export default Navbar
