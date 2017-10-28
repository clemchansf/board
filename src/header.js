import React from 'react'
import {heightStyle,
        alignStyle} from './styles'
export const Header = (item) => {
  //console.log("item", item)
  return <div
      style={Object.assign({}, {color: 'white'}, heightStyle, alignStyle, item.style)}>{item.name}</div>
}
