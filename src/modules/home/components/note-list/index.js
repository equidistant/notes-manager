import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Note from './Note'
import { getNotes, getPages, getDistinctTags, nextPage } from '../../../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { parseQuery } from '../../../../common'
import debounce from 'lodash.debounce'

const NoteList = () => {
  const noteListRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const didInvalidate = useSelector(state => state.notes.didInvalidate)
  const nextPage = useSelector(state => state.notes.nextPage)
  const pages = useSelector(state => state.notes.pages)
  const allIds = useSelector(state => state.notes.allIds)
  const filters = parseQuery(new URLSearchParams(history.location.search))
  useEffect(() => {
    if (didInvalidate) {
      getNotes({ dispatch, filters })
      // can optimize later
      getDistinctTags({ dispatch })
    }
  }, [didInvalidate, dispatch, filters])
  useEffect(() => {
    const scrollListener = debounce(() => {
      if (window.innerHeight + window.scrollY >= (0.9 * noteListRef.current.clientHeight)) {
        if (nextPage < pages) {
          getNotes({ dispatch, filters, nextPage })
        }
      }
    }, 50)
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [filters, dispatch, nextPage, pages])
  return (
    <NoteListContainer ref={noteListRef}>
      {allIds.map(id => {
        return (<Note
          key={id}
          id={id}
        />)
      })}
    </NoteListContainer>
  )
}

const NoteListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default NoteList
