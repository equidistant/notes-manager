import { getNotesRequest, getPagesRequest, addNoteRequest, updateNoteRequest, removeNoteRequest, getDistinctTagsRequest, parseDueDates } from '../common'
import { getNotesAction, setPagesAction, addNoteAction, updateNoteAction, removeNoteAction, setDistinctTagsAction, markDoneNoteAction } from './actions'

export const getNotes = async ({ dispatch, filters, nextPage = 0 }) => {
  if (filters.due) {
    filters.due = parseDueDates(filters.due)
  }
  filters.page = nextPage
  const { notes, pages } = await getNotesRequest(filters)
  dispatch(getNotesAction({ notes, pages }))
}

export const getPages = async ({ dispatch, filters }) => {
  if (filters.due) {
    filters.due = parseDueDates(filters.due)
  }
  const { pages } = await getPagesRequest(filters)
  dispatch(setPagesAction(pages))
}

export const addNote = async ({ data, dispatch }) => {
  const { _id: id, ...note } = await addNoteRequest(data)
  dispatch(addNoteAction({ id, note }))
}

export const updateNote = async ({ id, data, dispatch }) => {
  await updateNoteRequest({ id, data })
  dispatch(updateNoteAction({ id, note: data }))
}

export const removeNote = async ({ id, tags, dispatch }) => {
  await removeNoteRequest(id)
  dispatch(removeNoteAction({ id, tags }))
}

export const getDistinctTags = async ({ dispatch }) => {
  const distinctTags = await getDistinctTagsRequest()
  dispatch(setDistinctTagsAction(distinctTags))
}

export const markDoneNote = async ({ id, showDone, dispatch }) => {
  await updateNoteRequest({ id, data: { done: true } })
  dispatch(markDoneNoteAction({ id, showDone }))
}
