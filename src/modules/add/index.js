import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { TextInput, MultipleTextInput, TextArea, OutlinedButton, Checkbox } from '../../components'
import { to } from '../../common'
import { addNote, allTagsSelector } from '../../redux'

const Add = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const allTags = useSelector(allTagsSelector)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')
  const [due, setDue] = useState('')
  const [hours, setHours] = useState('')
  const [dueChecked, setDueChecked] = useState(false)
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
    // due time
    let dueDate
    if (due) {
      const [year, month, day] = due.split('-')
      dueDate = new Date(year, parseInt(month) - 1, day)
    }
    if (hours) {
      const [hour, minute] = hours.split(':')
      dueDate.setHours(parseInt(hour), parseInt(minute), 0, 0)
    }
    if (title && tags && body) {
      const data = {
        title: title.trim(),
        tags: tags.trim().split(' '),
        body: body.trim(),
        ...(due) && {
          due: dueDate.getTime()
        }
      }
      console.log(data)
      addNote({
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
  padding: 10px 20px 10px 20px;
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

export default Add
