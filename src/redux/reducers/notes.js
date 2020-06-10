import * as actionTypes from '../actionTypes'

const initialState = {
  pages: 0,
  nextPage: 0,
  allTagsCount: {},
  allIds: [],
  byIds: {},
  didInvalidate: true
}

const arrayToObject = (array) => array.reduce((acc, elem, index) => {
  acc[elem.id] = elem
  return acc
}, {})

const extractIds = (array) => array.map((elem, index) => elem.id)

const removeIdArray = (array, id) => array.filter(elem => elem !== id)

const removeIdObject = (object, id) => {
  const { [id]: value, ...rest } = object
  return rest
}

// const extractTags = (distinctTags) => distinctTags.map(({ tag, count }) => tag)

const mapToTagCountObject = (distinctTags) => distinctTags.reduce((acc, { tag, count }, index) => {
  acc[tag] = count
  return acc
}, {})

// const addIfNotExisting = (allTags, noteTags) => {
//   let newTags = [...allTags]
//   for (let tag of noteTags) {
//     if (!newTags.includes(tag)) {
//       newTags.push(tag)
//     }
//   }
//   return newTags
// }

const increaseTagsCount = (allTagsCount, tagsToIncrease) => {
  const newAllTagsCount = {...allTagsCount}
  for (let tag of tagsToIncrease) {
    if (newAllTagsCount[tag]) {
      newAllTagsCount[tag]+=1
    } else {
      newAllTagsCount[tag] = 1
    }
  }
  return newAllTagsCount
}

const reduceTagsCount = (allTagsCount, tagsToReduce) => Object.entries(allTagsCount)
  .reduce((acc, [tag, count], index) => {
    if (tagsToReduce.includes(tag)) {
      if (count > 1) {
        acc[tag] = count - 1
      }
    } else {
      acc[tag] = count
    }
    return acc
  }, {})

const updateTagsCount = (allTagsCount, oldTags, newTags) => {
  const deletedTags = oldTags.filter(tag => !newTags.includes(tag))
  const addedTags = newTags.filter(tag => !oldTags.includes(tag))
  let newAllTagsCount = reduceTagsCount(allTagsCount, deletedTags)
  newAllTagsCount = increaseTagsCount(newAllTagsCount, addedTags)
  return newAllTagsCount
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTES: {
      if (state.nextPage === 0) {
        return {
          ...state,
          pages: action.payload.pages,
          nextPage: state.nextPage + 1,
          allIds: extractIds(action.payload.notes),
          byIds: arrayToObject(action.payload.notes),
          didInvalidate: false
        }
      } else {
        const newPageAllIds = extractIds(action.payload.notes)
        const newPageByIds = arrayToObject(action.payload.notes)
        return {
          ...state,
          nextPage: state.nextPage + 1,
          allIds: [...state.allIds, ...newPageAllIds],
          byIds: {...state.byIds, ...newPageByIds},
          didInvalidate: false
        }
      }
    }
    case actionTypes.SET_PAGES: {
      return {
        ...state,
        pages: action.payload.pages
      }
    }
    case actionTypes.REMOVE_NOTE: {
      const allTagsCount = reduceTagsCount(state.allTagsCount, action.payload.tags)
      return {
        ...state,
        allIds: removeIdArray(state.allIds, action.payload.id),
        byIds: removeIdObject(state.byIds, action.payload.id),
        allTagsCount: allTagsCount
      }
    }
    case actionTypes.ADD_NOTE: {
      return {
        ...state,
        allIds: [action.payload.id, ...state.allIds],
        byIds: {
          ...state.byIds,
          [action.payload.id]: action.payload.note
        },
        allTagsCount: increaseTagsCount(state.allTagsCount, action.payload.note.tags)
      }
    }
    case actionTypes.UPDATE_NOTE: {
      let allTagsCount = action.payload.note.tags ? updateTagsCount(state.allTagsCount, state.byIds[action.payload.id].tags, action.payload.note.tags) : state.allTagsCount
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.payload.id]: {
            ...state.byIds[action.payload.id],
            ...action.payload.note
          }
        },
        allTagsCount: allTagsCount
      }
    }
    case actionTypes.MARK_DONE_NOTE: {
      if (!action.payload.showDone) {
        let byIds = {...state.byIds}
        delete byIds[action.payload.id]
        let allIds = state.allIds.filter(id => id !== action.payload.id)
        return {
          ...state,
          byIds,
          allIds
        }
      }
      return state
    }
    case actionTypes.SET_DISTINCT_TAGS: {
      return {
        ...state,
        allTagsCount: mapToTagCountObject(action.payload.distinctTags)
      }
    }
    case actionTypes.NEW_FILTER: {
      return {
        ...state,
        didInvalidate: true,
        nextPage: 0
      }
    }
    default:
      return state
  }
}
