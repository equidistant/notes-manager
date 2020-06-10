import { useRef, useState, useEffect } from 'react'

export const useFocusHover = () => {
  const cRef = useRef()
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const current = cRef.current
    const mouseDownListener = (e) => {
      if (current.contains(e.target)) {
        if (!focused) {
          setFocused(true)
        }
      } else if (!current.contains(e.target)) {
        if (focused) {
          setFocused(false)
        }
      }
    }
    const mouseOverListener = () => setHovered(true)
    const mouseOutListener = () => setHovered(false)
    window.addEventListener('mousedown', mouseDownListener)
    current.addEventListener('mouseover', mouseOverListener)
    current.addEventListener('mouseout', mouseOutListener)
    return () => {
      window.removeEventListener('mousedown', mouseDownListener)
      current.removeEventListener('mouseover', mouseOverListener)
      current.removeEventListener('mouseout', mouseOutListener)
    }
  })
  return [focused, hovered, cRef, setFocused]
}

export const useOutOfFocusFunction =  ({focused, func }) => {
  const cRef = useRef(null)
  useEffect(() => {
    const mouseDownListener = (e) => {
      if (focused && !cRef.current.contains(e.target)) {
        func()
      }
    }
    window.addEventListener('mousedown', mouseDownListener)
    return () => window.removeEventListener('mousedown', mouseDownListener)
  })
  return [cRef]
}

export const useInputSuggestions = ({ suggestions, value, onChange, name }) => {
  const [currentValue, setCurrentValue] = useState('')
  const [currentSuggestion, setCurrentSuggestion] = useState('')
  const [currentSuggestions, setCurrentSuggestions] = useState([])
  useEffect(
    () => {
      let localValue = value.toLowerCase()
      let enteredTags = []
      if (value.includes(' ')) {
        enteredTags = value.split(' ')
        localValue = enteredTags.pop()
      }
      if (localValue.length === 0) {
        setCurrentValue('')
        setCurrentSuggestion('')
        setCurrentSuggestions([])
      } else {
        let matches = suggestions.filter(suggestion => suggestion.includes(localValue))
        if (enteredTags.length !== 0) {
          matches = matches.filter(match => !enteredTags.includes(match))
        }
        setCurrentSuggestion(localValue)
        setCurrentValue(localValue)
        setCurrentSuggestions(matches)
      }
    },
    [value, suggestions]
  )
  const selectSuggestion = ({ suggestion, iRef, setFocused }) => {
    if (suggestion === '') {
      setCurrentSuggestions([])
    } else {
      const suggestionIndex = value.lastIndexOf(' ') !== -1 ? value.lastIndexOf(' ') + 1 : 0
      const removedStartOfSuggestion = value.slice(0, suggestionIndex)
      const newValue = removedStartOfSuggestion.concat(suggestion).concat(' ')
      onChange({
        target: {
          value: newValue
        }
      })
      iRef.current.focus()
      setFocused(true)
    }
  }
  return [currentValue, currentSuggestions, selectSuggestion, currentSuggestion]
}
