import React from 'react'
import styled, { css } from 'styled-components'

import { useFocusHover, useInputSuggestions, useOutOfFocusFunction } from '../common'

export const TextInput = ({ name, type, value, onChange, onBlur, error }) => {
  const [focused, hovered, iRef] = useFocusHover()
  return (
    <STextInput>
      <InputOutlineWrapper>
        <Input
          ref={iRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name.toLowerCase()}
          type={type}
          error={error}/>
        <OutlineWrapper focused={focused} hovered={hovered} error={error}>
          <OutlineLeading focused={focused}/>
          <OutlineNotch focused={focused} empty={value === ''}>
            {name && <OutlineLabel focused={focused} empty={value === ''} error={error}>{error ? `${name}*` : name}</OutlineLabel>}
          </OutlineNotch>
          <OutlineTrailing focused={focused}/>
        </OutlineWrapper>
      </InputOutlineWrapper>
      <ErrorWrapper>
        <Error show={error}>{error}</Error>
      </ErrorWrapper>
    </STextInput>
  )
}

export const MultipleTextInput = ({ name, type, suggestions, value, onChange, error, onBlur }) => {
  const [focused, hovered, iRef, setFocused] = useFocusHover()
  const [currentValue, currentSuggestions, selectSuggestion, currentSuggestion] = useInputSuggestions({ suggestions, value, onChange, name})
  return (
    <STextInput>
      <InputOutlineDropdownWrapper>
        <InputOutlineWrapper>
          <Input
            ref={iRef}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name.toLowerCase()}
            type={type}
            error={error}/>
          <OutlineWrapper focused={focused} hovered={hovered} error={error}>
            <OutlineLeading focused={focused}/>
            <OutlineNotch focused={focused} empty={value === ''}>
              <OutlineLabel focused={focused} empty={value === ''} error={error}>{error ? `${name}*` : name}</OutlineLabel>
            </OutlineNotch>
            <OutlineTrailing focused={focused}/>
          </OutlineWrapper>
        </InputOutlineWrapper>
        <Dropdown value={currentValue} suggestions={currentSuggestions} currentSuggestion={currentSuggestion} selectSuggestion={selectSuggestion} iRef={iRef} focused={focused} setFocused={setFocused} />
      </InputOutlineDropdownWrapper>
      <ErrorWrapper>
        <Error show={error}>{error}</Error>
      </ErrorWrapper>
    </STextInput>

  )
}

const Dropdown = ({ value, suggestions, currentSuggestion, selectSuggestion, iRef, focused, setFocused }) => {
  const [dRef] = useOutOfFocusFunction({focused, func: () => selectSuggestion({ suggestion: '', setFocused })})
  const boldSuggestion = ({ suggestion, currentSuggestion }) => {
    const suggestionIndex = suggestion.indexOf(currentSuggestion)
    const firstPart = suggestion.slice(0, suggestionIndex)
    const boldPart = suggestion.slice(suggestionIndex, suggestionIndex + currentSuggestion.length)
    const secondPart = suggestion.slice(suggestionIndex + currentSuggestion.length)
    return (
      <>
        <SuggestionNonBold>{firstPart}</SuggestionNonBold>
        <SuggestionBold>{boldPart}</SuggestionBold>
        <SuggestionNonBold>{secondPart}</SuggestionNonBold>
      </>
    )
  }
  return (
    <SDropdown show={suggestions.length !== 0} ref={dRef}>
      {suggestions.map((suggestion, index) => {
        return (
          <Suggestion onClick={() => selectSuggestion({ suggestion, iRef, setFocused })} key={index}>{boldSuggestion({ suggestion, currentSuggestion })}</Suggestion>
        )
      })}
    </SDropdown>
  )
}

export const TextArea = ({ name, value, onChange, onBlur, error }) => {
  const [focused, hovered, iRef] = useFocusHover()
  return (
    <STextInput>
      <TextAreaOutlineWrapper>
        <TextAreaInput
          ref={iRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name.toLowerCase()}
          error={error}/>
        <OutlineWrapper focused={focused} hovered={hovered} error={error}>
          <OutlineLeading focused={focused}/>
          <OutlineNotch focused={focused} empty={value === ''}>
            <OutlineTextAreaLabel focused={focused} empty={value === ''} error={error}>{error ? `${name}*` : name}</OutlineTextAreaLabel>
          </OutlineNotch>
          <OutlineTrailing focused={focused}/>
        </OutlineWrapper>
      </TextAreaOutlineWrapper>
      <ErrorWrapper>
        <Error show={error}>{error}</Error>
      </ErrorWrapper>
    </STextInput>

  )
}

export const Checkbox = ({ checked, handleChange }) => {
  return (
    <SCheckboxWrapper>
      <SCheckbox type={'checkbox'} checked={checked} onChange={handleChange}/>
    </SCheckboxWrapper>
  )
}

const STextInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`

const InputOutlineWrapper = styled.div`
  position: relative;
  height: 56px;
  display: inline-flex;
  border-radius: 4px 4px 0 0;
  width: 100%;
`

const Input = styled.input`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 12px 16px 14px;
  border: none !important;
  background-color: transparent;
  z-index: 1;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  align-self: flex-end;
  border-radius: 0;
  background: none;
  caret-color: blue;
  box-shadow: none;
  -webkit-touch-callout: auto;
  -webkit-user-select: auto;
  -khtml-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  ${props => props.error && css`
    caret-color: red;
  `}
`

const OutlineWrapper = styled.div`
  border-color: rgba(0,0,0,0.38);
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
  ${props => props.hovered && css`
    border-color: rgba(0,0,0,1);
  `}
  ${props => props.focused && css`
    border-color: blue;
  `}
  ${props => props.error && css`
    border-color: red;
  `}
`

const OutlineLeading = styled.div`
  border-color: inherit !important;
  border-radius: 4px 0 0 4px;
  border-left: 1px solid;
  border-right: none;
  border-bottom: 1px solid;
  border-top: 1px solid;
  width: 12px;
  height: 100%;
  text-align: left;
  ${props => props.focused && css`
    border-left: 2px solid;
    border-bottom: 2px solid;
    border-top: 2px solid;
  `}
`

const OutlineNotch = styled.div`
  border-color: inherit !important;
  height: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  text-align: left;
  ${props => props.focused && css`
    border-top: 2px solid;
    border-bottom: 2px solid;
  `}
  ${props => (props.focused || !props.empty) && css`
    border-top: none;
  `}
`

const OutlineTrailing = styled.div`
  border-color: inherit !important;
  border-left: none;
  border-top: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  flex-grow: 1;
  height: 100%;
  border-radius: 0 4px 4px 0;
  text-align: left;
  ${props => props.focused && css`
    border-top: 2px solid;
    border-right: 2px solid;
    border-bottom: 2px solid;
  `}
`

const OutlineLabel = styled.label`
  color: rgba(0,0,0,0.6);
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, color;
  transition-duration: 150ms, 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s, 0s;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.4px;
  letter-spacing: 0.15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
  ${props => (props.focused || !props.empty) && css`
    transform: translateY(-37.5px) scale(0.75);
    text-overflow: clip;
    color: blue;
  `}
  ${props => (!props.focused && !props.empty) && css`
    color: rgba(0,0,0,0.6);
  `}
  ${props => props.error && css`
    color: red;
  `}

`

const InputOutlineDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const SDropdown = styled.div`
  position: absolute;
  top: 56px;
  max-height: 200px;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${props => !props.show && css`
    display: none;
  `}
  border-left: 1px solid rgba(0,0,0,0.38);
  border-bottom: 1px solid rgba(0,0,0,0.38);
  border-right: 1px solid rgba(0,0,0,0.38);
  border-radius: 4px;
  background-color: white;
  z-index: 3;
  box-shadow: ${props => props.theme.shadow.dp4};
`

const Suggestion = styled.div`
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-family: Roboto;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0,0.03);
  }
`

const SuggestionNonBold = styled.div`
  font-weight: 400;
`

const SuggestionBold = styled.div`
  font-weight: 700;
`
const TextAreaOutlineWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  display: inline-flex;
  border-radius: 4px 4px 0 0;
`

const TextAreaInput = styled.textarea`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 12px 16px 14px 16px;
  border: none !important;
  background-color: transparent;
  z-index: 1;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  align-self: flex-end;
  border-radius: 0;
  background: none;
  caret-color: blue;
  box-shadow: none;
  -webkit-touch-callout: auto;
  -webkit-user-select: auto;
  -khtml-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  ${props => props.error && css`
    caret-color: red;
  `}
`

const OutlineTextAreaLabel = styled.label`
  color: rgba(0,0,0,0.6);
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, color;
  transition-duration: 150ms, 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s, 0s;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.4px;
  letter-spacing: 0.15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
  ${props => (props.focused || !props.empty) && css`
    transform: translateY(-109px) scale(0.75);
    text-overflow: clip;
    color: blue;
  `}
  ${props => (!props.focused && !props.empty) && css`
    color: rgba(0,0,0,0.6);
  `}
  ${props => props.error && css`
    color: red;
  `}
`

const ErrorWrapper = styled.div`
  width: 100%;
  height: 15px;
  margin-top: 4px;
`

const Error = styled.div`
  color: red;
  font-size: 12px;
  font-family: 'Roboto';
  letter-spacing: 0.4px;
  padding-left: 15px;
  visibility: hidden;
  opacity: 0;
  ${props => props.show && css`
    visibility: visible;
    opacity: 1;
  `}
`

const SCheckboxWrapper = styled.div`
  padding: 10px;
`

const SCheckbox = styled.input`
  width: 24px;
  height: 24px;
  display: block;
`
