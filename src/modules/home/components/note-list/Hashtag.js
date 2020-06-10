import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { newFilterAction } from '../../../../redux'
import { parseQuery, buildQuery } from '../../../../common'

const Hashtag = memo(({ tag }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const query = parseQuery(new URLSearchParams(history.location.search))
  const onChipClick = (tag) => {
    if (query.tags.includes(tag)) {
      query.tags = query.tags.filter(elem => elem !== tag)
    } else {
      query.tags.push(tag)
    }
    const newQuery = buildQuery(query)
    history.push({
      pathname: history.location.pathname,
      search: newQuery
    })
    dispatch(newFilterAction())
  }
  return (
    <HashtagContainer onClick={(e) => {
        e.stopPropagation()
        onChipClick(tag)
      }} selected={query.tags.includes(tag)}>#{tag}</HashtagContainer>
  )
})

const HashtagContainer = styled.div`
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 28px;
  color: black;
  margin-left: 4px;
  &:first-of-type {
    margin: 0;
  }
  &:hover {
    color: ${props => props.theme.color.light};
  }
  ${props => props.selected && css`
    color: ${props => props.theme.color.primary};
  `}
`

export default Hashtag
