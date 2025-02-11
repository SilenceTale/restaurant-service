'use client'
import React, { useState, useLayoutEffect } from 'react'
import { getCategories } from '../services/actions'
import styled from 'styled-components'
import type { CommonType } from '../../global/types/StyledType'
import classNames from 'classnames'
import colors from '../../global/styles/colors'
import sizes from '../../global/styles/sizes'
const { primary, white } = colors
const { medium } = sizes

const StyledNav = styled.nav<CommonType>`
  display: flex;
  flex-wrap: warp;
  margin-bottom: 30px;

  .tab {
    border: 1px solid ${primary};
    color: ${primary};
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${medium};

    &.on {
      background: ${primary};
      color: ${white};
    }
    .tab + .tab {
      margin-left: 15px;
    }
  }
`

const CategoryTabs = ({ categories, onClick }) => {
  const [items, setItems] = useState<string[]>()

  useLayoutEffect(() => {
    ;(async () => {
      const data = await getCategories()
      setItems(data)
    })()
  }, [])

  return (
    items &&
    items.length > 0 && (
      <StyledNav>
        {items.map((item) => (
          <div
            key={'category_' + item}
            onClick={() => onClick(item)}
            className={classNames('tab', { on: categories.includes(item) })}
          >
            {item}
          </div>
        ))}
      </StyledNav>
    )
  )
}

export default React.memo(CategoryTabs)
