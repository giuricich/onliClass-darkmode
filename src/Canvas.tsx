import { Tooltip, Button, Popup } from '@fluentui/react-northstar'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'


export default function Canvas(props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // when the component loads for the first time...
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

  }, [])

  return (
    <div id={props.id} style={props.styles}>
      <Popup trigger={<Button content="Pick Colour" />} content={<TwitterPicker/>} pointing={false} position="below"/>
      <canvas id="whiteboard" ref={canvasRef} ></canvas>
    </div>
  )
}