import React from 'react'
import styled from 'styled-components'

const Backdrop = ({ show, closeNav }) => {
  return (
    <SBackdrop show={show} onClick={closeNav} />
  )
}

const SBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition-property: opacity, visibility;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(33,33,33,1.0);
  visibility: ${props => props.show ? 'visible': 'hidden' };
  opacity: ${props => props.show ? 0.5 : 0 };
  z-index: 5;
`

export default Backdrop
