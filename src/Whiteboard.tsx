import { Tooltip, Button, Popup, Segment } from '@fluentui/react-northstar'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import Canvas from './Canvas'

type MouseData = {
  x?: number,
  y?: number,
  drawing?: boolean
}

export default function Whiteboard(props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#FF6900")
  // const [mouseData, setMouseData] = useState<MouseData>({drawing: false})
  let mouseData: MouseData = {x: null, y: null, drawing: false}

  const darkmode = {
    'default': {
      card: {
        background: 'rgb(41, 41, 41)',
        boxShadow: 'none',
        width: '258px',
        paddingTop: '6px',
        paddingLeft: '6px'
      },
      body: {
        padding: '0'
      },
      hash: {
        background: 'rgb(31, 31, 31)',
        color: 'rgb(214, 214, 214)'
      },
      input: {
        background: 'rgb(35, 35, 35)',
        boxShadow: 'rgb(35, 35, 35) 0px 0px 0px 1px inset',
        color: 'rgb(214, 214, 214)'
      }
    }
  }

  // when the component loads for the first time...
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const handleMouse = (event: MouseEvent) => {
      const mousex = event.x - canvas.offsetLeft
      const mousey = event.y - canvas.offsetTop
      console.log(event.type);
      switch (event.type) {
        
        case 'mousedown':
          mouseData = {x: mousex, y: mousey, drawing: true}
          // when the mouse is held down
          break;
        case 'mousemove':
          // console.log('moving because drawing: ', mouseData.drawing);
          
          if(mouseData.drawing) {
            console.log('x: ', mousex);
            console.log('drawing: ', mouseData.drawing);
            
            // draw
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.moveTo(mouseData.x, mouseData.y)
            ctx.lineTo(mousex, mousey)
            ctx.stroke()
            ctx.closePath()
          }

          mouseData.x = mousex
          mouseData.y = mousey
          break;
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
          console.log('event: ', event.type);
          mouseData.drawing = false
          break;
      }
    }

    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mousedown', handleMouse)
    canvas.addEventListener('mouseup', handleMouse)
    canvas.addEventListener('mouseout', handleMouse)
    canvas.addEventListener('mouseleave', handleMouse)

  }, [])


  const handleColor = color => {
    setColor(color.hex)

  }

  return (
    <div id={props.id} style={props.styles}>
      <Popup pointing trigger={<Button id="color-picker" iconOnly text content={<Segment inverted style={{ borderRadius: '4px', background: color }} />} />} content={<TwitterPicker onChangeComplete={handleColor} color={color} triangle="hide" styles={darkmode} />} />
      <Canvas ref={canvasRef} />
    </div>
  )
}