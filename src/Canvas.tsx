import { RefForward } from '@fluentui/react-northstar'
import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'
import { isContext } from 'vm'

//todo preformance is ass

type Props = {
  mouseData?: MouseData,
  color?: string
}

type MouseData = {
  x?: number,
  y?: number,
  drawing?: boolean
}

const useCombinedRefs = (...refs) => {
  const targetRef = React.useRef<HTMLCanvasElement>()

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}


const Canvas = forwardRef<HTMLCanvasElement, Props>(({ mouseData, color }, ref) => {

  const innerRef = useRef(null)
  const comboRef = useCombinedRefs(ref, innerRef)
  const [oldMouse, setOldMouse] = useState<MouseData>({ x: null, y: null})


  useEffect(() => {
    const context = comboRef.current.getContext('2d')
    if(mouseData.drawing) {
      console.log('mouseData: ', mouseData);
      console.log('oldMouse: ', oldMouse);
      
      
      context.beginPath()
      context.strokeStyle = color
      context.lineWidth = 2
      context.moveTo(mouseData.x, mouseData.y)
      context.lineTo(oldMouse.x, oldMouse.y)
      context.stroke()
      context.closePath()
    }
  
    setOldMouse({x: mouseData.x, y: mouseData.y})

  }, [mouseData])

  return (<canvas id="inner-canvas" ref={comboRef}></canvas>)
})

Canvas.displayName = 'Canvas'
export default Canvas
