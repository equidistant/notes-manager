import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ChipCarousel } from '../../../../components'
import { newFilterAction } from '../../../../redux'
import { parseQuery, buildQuery } from '../../../../common'

const TagChipsCarousel = memo(() => {
  const dispatch = useDispatch()
  const history = useHistory()
  const filters = parseQuery(new URLSearchParams(history.location.search))
  const dueDates = ['today', 'tomorrow', '7days', '30days', 'always']
  const onChipClick = (due) => {
    let filters = parseQuery(new URLSearchParams(history.location.search))
    if (filters.due === due) {
      delete filters.due
    } else {
      filters.due = due
    }
    const newFilters = buildQuery(filters)
    history.push({
      pathname: history.location.pathname,
      search: newFilters
    })
    dispatch(newFilterAction())
  }
  return (
    <ChipCarousel data={dueDates} active={[filters.due]} onChipClick={onChipClick}/>
  )
})

export default TagChipsCarousel
