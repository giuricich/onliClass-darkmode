import { RefForward } from '@fluentui/react-northstar'
import { Socket } from 'dgram'
import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'
import { isContext } from 'vm'

// dev flag, need to switch when in production
// const dev = true
const dev = false


type Props = {
  mouseData?: MouseData,
  color?: string
}

type MouseData = {
  x?: number,
  y?: number,
  drawing?: boolean
}

type DrawingEvent = {
  mouseData: MouseData,
  oldMouse: MouseData,
  color: string
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
  const [oldMouse, setOldMouse] = useState<MouseData>({ x: null, y: null })

  const draw = (context: CanvasRenderingContext2D, mouseData: MouseData, oldMouse: MouseData, color: string) => {
    context.beginPath()
    context.strokeStyle = color
    context.lineWidth = 2
    context.moveTo(mouseData.x, mouseData.y)
    context.lineTo(oldMouse.x, oldMouse.y)
    context.stroke()
    context.closePath()
  }

  const sizeCanvas = (canvas: HTMLCanvasElement ) => {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  useEffect(() => {
    const canvas = comboRef.current
    sizeCanvas(canvas)
    window.addEventListener('resize', () => sizeCanvas(canvas))

    if (!dev) {
      //@ts-expect-error
      socket.on('drawing', (event: DrawingEvent) => {
        const context = canvas.getContext('2d')
        draw(context, event.mouseData, event.oldMouse, event.color)
      })
    }

  }, [])
  // empty array here means this only runs once 


  // mouse efect
  useEffect(() => {

    const context = comboRef.current.getContext('2d')
    if (mouseData.drawing) {

      draw(context, mouseData, oldMouse, color)

      if (!dev) {
        // @ts-expect-error
        socket.emit('drawing', {
          mouseData,
          oldMouse,
          color
        })
      }
    }

    setOldMouse({ x: mouseData.x, y: mouseData.y })

  }, [mouseData])

  return (<canvas id="inner-canvas" ref={comboRef}></canvas>)
})

Canvas.displayName = 'Canvas'
export default Canvas
