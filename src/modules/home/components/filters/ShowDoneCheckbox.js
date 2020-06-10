import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Checkbox } from '../../../../components'
import { newFilterAction } from '../../../../redux'
import { buildQuery, parseQuery } from '../../../../common'

const ShowDoneCheckbox = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const filters = parseQuery(new URLSearchParams(history.location.search))
  const handleChange = () => {
    let filters = parseQuery(new URLSearchParams(history.location.search))
    filters.done = filters.done !== 'true'
    const newFilters = buildQuery(filters)
    history.push({
      pathname: history.location.pathname,
      search: newFilters
    })
    dispatch(newFilterAction())
  }
  return (
    <Checkbox checked={filters.done === 'true'} handleChange={handleChange}/>
  )
}

export default ShowDoneCheckbox
