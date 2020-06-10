import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { CloseButton } from '../../components'
import { to } from '../../common'

const Drawer = ({ show, closeNav }) => {
  const history = useHistory()
  const onClick = ({ url }) => {
    to({ url, history })
    closeNav()
  }
  return (
    <DrawerContainer show={show}>
      <HeaderRow>
        <CloseButtonWrapper>
          <CloseButton onClick={closeNav} />
        </CloseButtonWrapper>
        <Header>
          Notes Manager
        </Header>
      </HeaderRow>
      <Links>
        <LinkWrapper onClick={() => onClick({ url: '/' })}>
          <Link>Home</Link>
        </LinkWrapper>
        <LinkWrapper onClick={() => onClick({ url: '/add' })}>
          <Link>Add note</Link>
        </LinkWrapper>
      </Links>
    </DrawerContainer>
  )
}

const DrawerContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 300px;
  z-index: 100;
  background-color: white;
  transform: translateX(-300px);
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.show &&`
    transform: translateX(0);
    box-shadow: ${props => props.theme.shadow.dp16};
  `}
  background-color: ${props => props.theme.color.lightgrey};
`

const HeaderRow = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${props => props.theme.color.primary};
`

const CloseButtonWrapper = styled.div`
  width: 54px;
  min-width: 50px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`

const Header = styled.div`
  margin-left: 8px
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`

const Links = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

const Link = styled.div`
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 20px;
  color: inherit;
`

const LinkWrapper = styled.div`
  width: 100%;
  color: rgb(96, 103, 112);
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.color.grey};
    color: ${props => props.theme.color.primary};
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  &:active ${Link} {
    transform: translateY(2px);
  }
`

export default Drawer
