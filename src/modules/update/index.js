import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { TextInput, MultipleTextInput, TextArea, OutlinedButton, Checkbox } from '../../components'
import { to, millisToDatePick, millisToHourPick } from '../../common'
import { updateNote, allTagsSelector } from '../../redux'

const Update = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const allTags = useSelector(allTagsSelector)
  const note = useSelector(state => state.notes.byIds[id])
  const [title, setTitle] = useState(note.title)
  const [tags, setTags] = useState(`${note.tags.join(' ')} `)
  const [body, setBody] = useState(note.body)
  const [due, setDue] = useState(note.due !== 0 ? millisToDatePick(note.due) : '')
  const [hours, setHours] = useState(note.due !== 0 ? millisToHourPick(note.due) : '')
  const [dueChecked, setDueChecked] = useState(note.due !== 0)
  const [titleError, setTitleError] = useState('')
  const [tagsError, setTagsError] = useState('')
  const [bodyError, setBodyError] = useState('')
  const handleChangeTitle = (e) => setTitle(e.target.value)
  const handleChangeTags = (e) => setTags(e.target.value)
  const handleChangeBody = (e) => setBody(e.target.value)
  const handleChangeDue = (e) => setDue(e.target.value)
  const handleChangeHours = (e) => setHours(e.target.value)
  const checkErrorTitle = () => setTitleError(!title ? '*Please provide a title.' : '')
  const checkErrorTags = () => setTagsError(!tags ? '*Please provide at least one tag.' : '')
  const checkErrorBody = () => setBodyError(!body ? '*Please provide some text.' : '')
  const cancel = () => {
    history.goBack()
  }
  const submit = () => {
    if (!title) {
      setTitleError('*Please provide a title.')
    }
    if (!tags) {
      setTagsError('*Please provide at least one tag.')
    }
    if (!body) {
      setBodyError('*Please provide some text.')
    }
    if (title && tags && body) {
      let data = {
        title: title.trim(),
        tags: tags.trim().split(' '),
        body: body.trim(),
        due: 0
      }
      if (dueChecked) {
        if (due) {
          const [year, month, day] = due.split('-')
          let dueDate = new Date(year, parseInt(month) - 1, day)
          if (hours) {
            const [hour, minute] = hours.split(':')
            dueDate.setHours(parseInt(hour), parseInt(minute), 0, 0)
          }
          data.due = dueDate.getTime()
        }
      }
      updateNote({
        id,
        data,
        dispatch
      })
      to({ url: '/', history })
    }
  }
  return (
    <SCreate>
      <CenterWrapper>
        <TextInput
          value={title}
          error={titleError}
          onChange={handleChangeTitle}
          onBlur={checkErrorTitle}
          name={'Title'}
          type={'text'}
          />
        <MultipleTextInput
          value={tags}
          error={tagsError}
          onChange={handleChangeTags}
          onBlur={checkErrorTags}
          name={'Tags'}
          type={'text'}
          suggestions={allTags}
        />
        <TextArea
          value={body}
          error={bodyError}
          onChange={handleChangeBody}
          onBlur={checkErrorBody}
          name={'Body'}
          type={'text'}
        />
        <CheckboxRow>
          <Header>Due</Header>
          <Checkbox checked={dueChecked} handleChange={() => setDueChecked(!dueChecked)}/>
        </CheckboxRow>
        <ExpandContainer expand={dueChecked}>
          <TextInput
            value={due}
            onChange={handleChangeDue}
            name={''}
            type={'date'}
          />
          <TextInput
            value={hours}
            onChange={handleChangeHours}
            name={''}
            type={'time'}
            />
        </ExpandContainer>
        <Buttons>
          <CancelButton onClick={cancel}>Cancel</CancelButton>
          <OutlinedButton onClick={submit}>Submit</OutlinedButton>
        </Buttons>
      </CenterWrapper>
    </SCreate>
  )
}

const SCreate = styled.div`
  min-height: 100%;
  padding-top: 64px;
`

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-bottom: 16px;
`

const CancelButton = styled(OutlinedButton)`
  border-color: red;
  color: red;
  margin-right: 8px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  font-weight: 400;
  width: min-content;
`

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  ${props => props.expand && css`
    max-height: 1000px;
  `}
`

export default Update
