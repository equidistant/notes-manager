import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { DoneButton, UpdateButton, RemoveButton, ExpandButton } from '../../../../components'
import Hashtag from './Hashtag'
import { millisToString, to, parseQuery } from '../../../../common'
import { removeNote, markDoneNote } from '../../../../redux'

const Note = memo(({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(false)
  const { title, tags, body, created, due, done } = useSelector(state => state.notes.byIds[id])
  const filters = parseQuery(new URLSearchParams(history.location.search))
  return (
    <NoteContainer onClick={() => setSelected(!selected)} selected={selected}>
      <Row>
        <Title>
          {title}
        </Title>
        <ExpandButton show={selected}/>
      </Row>
      <Row>
        <Tags>
          {tags.map((tag, index) => <Hashtag key={index} tag={tag}/>)}
        </Tags>
      </Row>
      <ExpandContainer selected={selected}>
        <Row>
          <Body>
            {body}
          </Body>
        </Row>
        <Row margin={'10px 0 0 0'}>
          <DatesRow>
            <Created>Created: {millisToString({ date: new Date(created), showHours: true})}</Created>
            {due !== 0 && <Created>Due: {millisToString({ date: new Date(due), showHours: true})}</Created>}
          </DatesRow>
          <Actions>
            {!done && <DoneButton onClick={(e) => {
                e.stopPropagation()
                markDoneNote({
                  id,
                  showDone: filters.done === 'true',
                  dispatch
                })
              }}/>}
            <UpdateButton onClick={(e) => {
                e.stopPropagation()
                to({ url: `/update/${id}`, history})
              }}/>
            <RemoveButton onClick={(e) => {
                e.stopPropagation()
                removeNote({ id, tags, dispatch })
              }}/>
          </Actions>
        </Row>
      </ExpandContainer>
    </NoteContainer>
  )
})

const NoteContainer = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.14);
  padding: 10px 10px 10px 20px;
  transition-property: background-color;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.selected && css`
    background-color: ${props => props.theme.color.lightgrey};
  `}
  &:hover {
    background-color: ${props => props.theme.color.primary}19;
    cursor: pointer;
  }
`
// background-color: rgba(0,0,0,0.04);
// background-color: rgba(224,224,224,0.5);

//  padding: 6px 6px 16px 16px;
//  padding: 6px 6px 6px 16px;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${props => props.margin && css`
    margin: ${props.margin};
  `}
`

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  font-weight: 500;
  color: ${props => props.theme.color.dark};
`

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ExpandContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 0px;
  overflow: hidden;
  transition-property: max-height;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.selected && css`
    max-height: 1000px;
  `}
`

const Body = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.05px;
  font-weight: 400;
  min-height: 34px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const Created = styled.div`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.15px;
  opacity: 0.6;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
`

const DatesRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export default Note
