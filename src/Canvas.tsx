import { Tooltip, Button, Popup, Segment } from '@fluentui/react-northstar'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { TwitterPicker } from 'react-color'
import reactCSS from 'reactcss'


export default function Canvas(props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState("#FF6900")

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

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

  }, [])

  const handleColor =  color => {
    setColor(color.hex)

  }

  return (
    <div id={props.id} style={props.styles}>
      <Popup pointing trigger={<Button id="color-picker" iconOnly text content={<Segment inverted style={{borderRadius: '4px', background: color}} />} />} content={<TwitterPicker onChangeComplete={handleColor} color={color} triangle="hide" styles={darkmode}/>}/>
      <canvas id="whiteboard" ref={canvasRef} ></canvas>
    </div>
  )
}