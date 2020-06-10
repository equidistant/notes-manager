import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AddButton } from '../../components'
import { NoteList, Filters } from './components'
import { to } from '../../common'

const Home = () => {
  const history = useHistory()
  return (
    <HomeContainer>
      <AddButton onClick={() => to({ url: '/add', history})}/>
      <Filters />
      <NoteList />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  min-height: 100%;
  padding-top: 65px;
`

export default Home
