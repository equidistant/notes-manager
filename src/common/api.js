import { buildQuery } from './utils'

// INTERFACE

export const getNotesRequest = (filters) => {
  return getRequest({ url: `${process.env.REACT_APP_API_URL}/note${buildQuery(filters)}` })
}

export const getPagesRequest = (filters) => {
  return getRequest({ url: `${process.env.REACT_APP_API_URL}/note/pages${buildQuery(filters)}` })
}

export const addNoteRequest = (data) => {
  return postRequest({ url: `${process.env.REACT_APP_API_URL}/note`, data })
}

export const updateNoteRequest = ({ id, data }) => {
  return patchRequest({ url: `${process.env.REACT_APP_API_URL}/note/${id}`, data })
}

export const removeNoteRequest = (id) => {
  return deleteRequest({ url: `${process.env.REACT_APP_API_URL}/note/${id}` })
}

export const getDistinctTagsRequest = () => {
  return getRequest({ url: `${process.env.REACT_APP_API_URL}/note/tags` })
}

// HTTP METHODS

export const getRequest = async ({ url = '' }) => {
  const response = await fetch(url, {
    method: 'GET'
  })
  return response.json()
}

export const postRequest = async ({ url = '', data = {} }) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const patchRequest = async ({ url = '', data = {} }) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const deleteRequest = async ({ url = '' }) => {
  const response = await fetch(url, {
    method: 'DELETE'
  })
  return response.json()
}
