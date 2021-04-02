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
  const [mouseData, setMouseData] = useState<MouseData>({x: null, y: null, drawing: false})
  // let mouseData: MouseData = {x: null, y: null, drawing: false}

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
    const container = canvas.parentElement


    const handleMouse = (event: MouseEvent) => {
      const mousex = event.x - canvas.offsetLeft
      const mousey = event.y - canvas.offsetTop
      switch (event.type) {
        
        case 'mousedown':
          setMouseData({x: mousex, y: mousey, drawing: true})
          break;
        case 'mousemove':
          setMouseData(state => ({...state, x: mousex, y: mousey}))
          break;
        case 'mouseup':
        case 'mouseout':
          setMouseData(state => ({...state, drawing: false}))
          break;
      }
    }

    // should be integrated into handleMouse eventaully
    const handleTouch = (event: TouchEvent) => {
      event.preventDefault()
      const touchx = event.touches[0].clientX
      const touchy = event.touches[0].clientY
      switch(event.type) {
        case 'touchstart':
          setMouseData({x: touchx, y: touchy, drawing: true})
          break;
        case 'touchmove':
          setMouseData(state => ({...state, x: touchx, y: touchy}))
          break;
        case 'touchcancel':
        case 'touchend':
          setMouseData(state => ({...state, drawing: false}))
          break;
      }
    }

    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mousedown', handleMouse)
    canvas.addEventListener('mouseup', handleMouse)
    canvas.addEventListener('mouseout', handleMouse)

    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchend', handleTouch);
    canvas.addEventListener('touchcancel', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
  
    
  }, [])


  const handleColor = color => {
    setColor(color.hex)

  }

  return (
    <div id={props.id} style={props.styles}>
      <Popup pointing trigger={<Button id="color-picker" iconOnly text content={<Segment inverted style={{ borderRadius: '4px', background: color }} />} />} content={<TwitterPicker onChangeComplete={handleColor} color={color} triangle="hide" styles={darkmode} />} />
      <Canvas mouseData={mouseData} color={color} ref={canvasRef} />
    </div>
  )
}