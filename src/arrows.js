import React from 'react'

export const Arrow = ({text, ...restProps}) => {
  return <span {...restProps}>{text}</span>
}
export const LeftArrow = (props) => {
  return <Arrow {...props} style={{float: 'left', marginLeft: 3, }} text="&lt;"/>
}
export const RightArrow = (props) => {
  return <Arrow {...props} style={{float: 'right', marginRight: 3, }} text="&gt;"/>
}
