import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Search from './Search'
import DueChipsCarousel from './DueChipsCarousel'
import TagChipsCarousel from './TagChipsCarousel'
import { MoreButton } from '../../../../components'
import ShowDoneCheckbox from './ShowDoneCheckbox'

const Filters = () => {
  const [expand, setExpand] = useState(false)
  return (
    <FiltersContainer>
      <Row>
        <Header>Filters: </Header>
        <RightAlignContainer>
          <Search />
          <MoreButton onClick={() => setExpand(!expand)}/>
        </RightAlignContainer>
      </Row>
      <ExpandContainer expand={expand}>
        <Row>
          <FilterName>Tags:</FilterName>
          <TagChipsCarousel />
        </Row>
        <LeftRow>
          <FilterName>Show done:</FilterName>
          <ShowDoneCheckbox />
        </LeftRow>
        <Row>
          <FilterName>Due:</FilterName>
          <DueChipsCarousel/>
        </Row>
      </ExpandContainer>
    </FiltersContainer>
  )
}

const FiltersContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.14);
`

const Row = styled.div`
  padding: 10px 0px 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LeftRow = styled(Row)`
  justify-content: flex-start;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  font-weight: 500;
`

const FilterName = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  font-weight: 400;
`

const RightAlignContainer = styled.div`
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ExpandContainer = styled.div`
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition-property: max-height;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.expand && css`
    max-height: 500px;
  `}
`

export default Filters
