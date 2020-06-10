import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import {
  AddIcon, MenuIcon, CloseIcon, DoneIcon, RemoveIcon, UpdateIcon, SearchIcon,
  TuneIcon, ArrowBackIcon, ArrowDownIcon, ArrowUpIcon, MoreIcon, ArrowRightIcon, ArrowLeftIcon } from './Icons'

export const AddButton = memo(({ onClick }) => {
  return (
    <AddButtonWrapper onClick={onClick}>
      <AddIcon />
    </AddButtonWrapper>
  )
})

export const MenuButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <MenuIcon />
    </IconButton>
  )
})

export const CloseButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  )
})


export const DoneButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DoneIcon />
    </IconButton>
  )
})

export const RemoveButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <RemoveIcon />
    </IconButton>
  )
})

export const UpdateButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <UpdateIcon />
    </IconButton>
  )
})

export const SearchButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <SearchIcon />
    </IconButton>
  )
})

export const TuneButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <TuneIcon />
    </IconButton>
  )
})

export const MoreButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <MoreIcon />
    </IconButton>
  )
})

export const ArrowBackButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  )
})

export const ArrowRightButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <ArrowRightIcon />
    </IconButton>
  )
})

export const ArrowLeftButton = memo(({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <ArrowLeftIcon />
    </IconButton>
  )
})

export const ExpandButton = memo(({ show, arrowDownClick, arrowUpClick}) => {
  return (
    <ExpandButtonContainer>
      <ArrowButtonDown hide={show} onClick={arrowDownClick}>
        <ArrowDownIcon />
      </ArrowButtonDown>
      <ArrowButtonUp show={show} onClick={arrowUpClick}>
        <ArrowUpIcon />
      </ArrowButtonUp>
  </ExpandButtonContainer>
  )
})

export const IconButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  &:active {
    transform: translateY(2px);
  }
  padding: 10px;
`

const ExpandButtonContainer = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
`

const ArrowButtonDown = styled(IconButton)`
  position: absolute;
  opacity: 1;
  visibility: visible;
  transition-property: opacity, visibility;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.hide && css`
    visibility: hidden;
    opacity: 0;
  `}
`

const ArrowButtonUp = styled(IconButton)`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.show && css`
    visibility: visible;
    opacity: 1;
  `}
`

export const AddButtonWrapper = styled.button`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 56px;
  height: 56px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow.dp1};
  opacity: 0.85;
  background-color: ${props => props.theme.color.primary};
  z-index: 1;
  transition:
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms,
    transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  &:hover {
    opacity: 1;
    box-shadow: ${props => props.theme.shadow.dp4};
  }
`

export const OutlinedButton = styled.button`
  border-radius: 4px;
  border: 1px solid blue;
  color: blue;
  background-color: transparent;
  height: 36px;
  padding: 0 15px 0 15px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-decoration: none;
  text-transform: uppercase;
  min-width: 64px;
  outline: none;
  &:hover {
    background-color: rgba(0,0,0,0.04);
    cursor: pointer;
  }
  &:active {
    transform: translateY(2px);
  }
`
