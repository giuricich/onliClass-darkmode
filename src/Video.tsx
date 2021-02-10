import React, { CSSProperties } from 'react'

export default function Video (props) {
  return (
    <div id="video"  style={props.styles}>
      <div id="subscriber"></div>
      <div id="publisher"  style={{height: '100%'}}></div>
    </div>
  )
}