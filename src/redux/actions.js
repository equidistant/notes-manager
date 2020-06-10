import * as actionTypes from './actionTypes'

export const getNotesAction = ({ notes, pages }) => ({
  type: actionTypes.GET_NOTES,
  payload: {
    notes,
    pages
  }
})

export const setPagesAction = pages => ({
  type: actionTypes.SET_PAGES,
  payload: {
    pages
  }
})

export const addNoteAction = ({ id, note }) => ({
  type: actionTypes.ADD_NOTE,
  payload: {
    id,
    note
  }
})

export const removeNoteAction = ({ id, tags }) => ({
  type: actionTypes.REMOVE_NOTE,
  payload: {
    id,
    tags
  }
})

export const updateNoteAction = ({ id, note }) => ({
  type: actionTypes.UPDATE_NOTE,
  payload: {
    id,
    note
  }
})

export const markDoneNoteAction = ({ id, done, showDone }) => ({
  type: actionTypes.MARK_DONE_NOTE,
  payload: {
    id,
    done,
    showDone
  }
})

export const setDistinctTagsAction = distinctTags => ({
  type: actionTypes.SET_DISTINCT_TAGS,
  payload: {
    distinctTags
  }
})

export const newFilterAction = () => ({
  type: actionTypes.NEW_FILTER
})
