import React, { CSSProperties } from 'react'

export default function Video (props) {
  return (
    <div id="video"  style={props.styles}>
      {props.host && <div id="publisher"  style={{height: '100%'}}></div>}
      {!props.host && <div id="subscriber" style={{height: '100%'}}></div>}
    </div>
  )
}