import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChipCarousel } from '../../../../components'
import { newFilterAction, allTagsSelector } from '../../../../redux'
import { parseQuery, buildQuery } from '../../../../common'

const TagChipsCarousel = memo(() => {
  const dispatch = useDispatch()
  const history = useHistory()
  const allTags = useSelector(allTagsSelector)
  const filters = parseQuery(new URLSearchParams(history.location.search))
  const onChipClick = (tag) => {
    let filters = parseQuery(new URLSearchParams(history.location.search))
    if (filters.tags.includes(tag)) {
      filters.tags = filters.tags.filter(elem => elem !== tag)
    } else {
      filters.tags.push(tag)
    }
    const newFilters = buildQuery(filters)
    history.push({
      pathname: history.location.pathname,
      search: newFilters
    })
    dispatch(newFilterAction())
  }
  return (
    <ChipCarousel data={allTags} active={filters.tags} onChipClick={onChipClick}/>
  )
})

export default TagChipsCarousel
