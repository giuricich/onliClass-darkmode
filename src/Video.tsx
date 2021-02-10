import React, { CSSProperties } from 'react'

const videoStyle : CSSProperties = {
  margin: 'auto',
  width: '500px',
}

export default function Video () {
  return (
    <div id="video"  style = {videoStyle}>
      <div id="subscriber"></div>
      <div id="publisher"></div>
    </div>
  )
}