import React, { memo, useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { ArrowLeftButton, ArrowRightButton } from './Buttons'

export const ChipCarousel = memo(({ data, active, onChipClick }) => {
  const [translateX, setTranslateX] = useState(0)
  const [relativeWidth, setRelativeWidth] = useState(0)
  const [absoluteWidth, setAbsoluteWidth] = useState(0)
  const [minTranslateX, setMinTranslateX] = useState(0)
  const rRef = useRef(null)
  const aRef = useRef(null)
  const translateRight = () => {
    if (translateX - 320 > minTranslateX) {
      setTranslateX(translateX - 320)
    } else {
      setTranslateX(minTranslateX)
    }
  }
  const translateLeft = () => {
    if (translateX + 320 < 0) {
      setTranslateX(translateX + 320)
    } else {
      setTranslateX(0)
    }
  }
  useEffect(() => {
    const resizeListener = () => {
      setRelativeWidth(rRef.current.clientWidth)
      setAbsoluteWidth(aRef.current.scrollWidth)
      setMinTranslateX(rRef.current.clientWidth - aRef.current.scrollWidth)
      setTranslateX(0)
    }
    setRelativeWidth(rRef.current.clientWidth)
    setAbsoluteWidth(aRef.current.scrollWidth)
    setMinTranslateX(rRef.current.clientWidth - aRef.current.scrollWidth - 44)
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [data])
  return (
    <ChipCarouselContainer>
      {translateX === 0 && <ArrowPlaceHolder/>}
      {translateX !== 0 && <ArrowLeftButton onClick={translateLeft}/>}
      <ChipCarouselRelativeWrapper ref={rRef}>
        <ChipCarouselAbsoluteWrapper style={{
            'transform': `translateX(${translateX}px)`
          }} ref={aRef}>
          {data.map((elem, index) => <Chip
            text={elem}
            key={index}
            active={active.includes(elem)}
            onClick={() => onChipClick(elem)}/>)}
        </ChipCarouselAbsoluteWrapper>
      </ChipCarouselRelativeWrapper>
      {(translateX !== minTranslateX && absoluteWidth > relativeWidth) && <ArrowRightButton onClick={translateRight}/>}
      {translateX === minTranslateX && <ArrowPlaceHolder/>}
    </ChipCarouselContainer>
  )
})

export const Chip = memo(({ text, ...rest }) => {
  return (
    <ChipWrapper {...rest}>
      <ChipText>
        {text}
      </ChipText>
    </ChipWrapper>
  )
})

const ChipCarouselContainer = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ChipCarouselRelativeWrapper = styled.div`
  width: 100%;
  height: 32px;
  position: relative;
  overflow: hidden;
`

const ChipCarouselAbsoluteWrapper = styled.div`
  position: absolute;
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  will-change: transform;
`

  // background-color: rgb(224, 224, 224);
  // background-color: #d0d0d0;
const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.theme.color.grey};
  height: 32px;
  width: max-content;
  padding-left: 14px;
  padding-right: 14px;
  color: rgba(0,0,0,0.87);
  ${props => props.active && css`
    background-color: ${props => props.theme.color.primary};
  `}
  &:hover {
    background-color: ${props => props.theme.color.light};
    cursor: pointer;
  }
  margin-left: 12px;
  &:first-of-type {
    margin-left: 0 !important;
  }
`

const ChipText = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 20px;
`

const ArrowPlaceHolder = styled.div`
  width: 20px;
  height: 100%;
  flex-shrink: 0;
`
