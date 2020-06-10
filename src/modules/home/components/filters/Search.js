import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import debounce from 'lodash.debounce'
import { newFilterAction } from '../../../../redux'
import { buildQuery, parseQuery, useFocusHover } from '../../../../common'
import { SearchIcon } from '../../../../components'

const debouncedSetFilterWordsAction = debounce(({ words, history, dispatch }) => {
  const query = parseQuery(new URLSearchParams(history.location.search))
  query.words = words
  const newQuery = buildQuery(query)
  history.push({
    pathname: history.location.pathname,
    search: newQuery
  })
  dispatch(newFilterAction())
}, 500)

const Search = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [focused, hovered, cRef] = useFocusHover()
  const filters = parseQuery(new URLSearchParams(history.location.search))
  const [search, setSearch] = useState(filters.words.join(' '))
  const onChange = (e) => {
    let words = e.target.value.trim()
    if (words) {
      if (words.includes(' ')) {
        words = words.split(' ')
      } else {
        words = [words]
      }
    } else {
      words = []
    }
    setSearch(e.target.value)
    debouncedSetFilterWordsAction({ words, history, dispatch })
  }
  return (
    <SearchBarContainer focused={focused} hovered={hovered}>
      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>
      <SearchInput
        ref={cRef}
        value={search}
        onChange={onChange}
        placeholder={'Search...'}
      />
    </SearchBarContainer>
  )
}
    //  background-color: rgba(224, 224, 224, 0.4);
    // background-color: rgba(224,224,224,0.6);
    // background-color: rgba(224,224,224,0.6);
const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 150px;
  position: relative;
  display: flex;
  background-color: ${props => props.theme.color.lightgrey};
  border-radius: 4px;
  overflow: hidden;
  transition-property: max-width;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.focused && css`
    max-width: 180px;
    background-color: ${props => props.theme.color.grey}7D;
  `}
  ${props => props.hovered && css`
    background-color: ${props => props.theme.color.grey}7D;
  `}
`

const SearchIconWrapper = styled.div`
  padding: 8px 16px 8px 16px;
`

const SearchInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  background: none;
  border: none;
  padding: 8px;
`

export default Search
