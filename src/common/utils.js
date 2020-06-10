export const scrollTo = (top) => window.scrollTo({ top: top, behavior: 'smooth' })

export const to = ({ history, url }) => {
  scrollTo(0)
  history.push(url)
}

export const millisToString = ({ date = new Date(Date.now()), showHours = true }) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  let string = `${day}.${month}.${date.getFullYear()}.`
  if (showHours) {
    string = `${string} ${hours}:${minutes}:${seconds}`
  }
  return string
}

export const extractDistinctTags = (notes) => {
  const tags = notes.reduce((acc, note, index) => {
    note.tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, [])
  return tags.sort()
}

export const buildQuery = (params) => {
  let first = true
  const url = Object.entries(params).reduce((url, [key, value]) => {
    if (value.length === 0) {
      return url
    }
    if (first) {
      first = false
      if (typeof value === 'object') {
        url += `?${key}=${value.join(',')}`
      }
      if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
        url += `?${key}=${value}`
      }
    } else {
      if (typeof value === 'object') {
        url += `&${key}=${value.join(',')}`
      }
      if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
        url += `&${key}=${value}`
      }
    }
    return url
  }, '')
  return url
}

export const parseQuery = (query) => {
  let params = {
    tags: [],
    words: [],
    done: false
  }
  let queryTags = query.get('tags')
  if (queryTags) {
    if (queryTags.includes(',')) {
      params.tags = queryTags.split(',')
    } else {
      params.tags = [queryTags]
    }
  }
  let queryWords = query.get('words')
  if (queryWords) {
    if (queryWords.includes(',')) {
      params.words = queryWords.split(',')
    } else {
      params.words = [queryWords]
    }
  }
  let queryDone = query.get('done')
  if (queryDone) {
    params.done = queryDone
  }
  let queryDue = query.get('due')
  if (queryDue) {
    params.due = queryDue
  }
  return params
}

export const parseDueDates = (due) => {
  let from = 0
  let to = 0
  switch (due) {
    case 'today': {
      let fromDate = new Date()
      fromDate.setHours(0,0,0,0)
      let toDate = new Date()
      toDate.setHours(24,0,0,0)
      from = fromDate.getTime()
      to = toDate.getTime() - 1
      break
    }
    case 'tomorrow': {
      let fromDate = new Date()
      fromDate.setHours(24,0,0,0)
      let toDate = new Date(fromDate.getTime() + 86400000 - 1)
      from = fromDate.getTime()
      to = toDate.getTime()
      break
    }
    case '7days': {
      let fromDate = new Date()
      fromDate.setHours(0,0,0,0)
      let toDate = new Date(fromDate.getTime() + 7 * 86400000 - 1)
      from = fromDate.getTime()
      to = toDate.getTime()
      break
    }
    case '30days': {
      let fromDate = new Date()
      fromDate.setHours(0,0,0,0)
      let toDate = new Date(fromDate.getTime() + 30 * 86400000 - 1)
      from = fromDate.getTime()
      to = toDate.getTime()
      break
    }
    default:
  }
  return [from, to]
}

export const millisToDatePick = (millis) => {
  const date = new Date(millis)
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const millisToHourPick = (millis) => {
  const date = new Date(millis)
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  return `${hours}:${minutes}`
}
