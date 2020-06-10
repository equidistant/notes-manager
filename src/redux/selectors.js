import { createSelector } from 'reselect'

export const allTagsSelector = createSelector(
  state => state.notes.allTagsCount,
  allTagsCount =>  Object.entries(allTagsCount).sort(([aTag, aCount], [bTag, bCount]) => aCount < bCount).map(([tag, count]) => tag)
)
