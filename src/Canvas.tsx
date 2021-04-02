import React, { forwardRef, useEffect, useRef, useState } from 'react'

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

// this makes it possible to target the canvas in html, and pass it forward to the parent componenet
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
        const ioMouseData: MouseData = {
          x: event.mouseData.x * canvas.width,
          y: event.mouseData.y * canvas.height,
          drawing: event.mouseData.drawing
        }
        const ioOldMouse = {
          x: event.oldMouse.x * canvas.width,
          y: event.oldMouse.y * canvas.height
        }

        draw(context, ioMouseData, ioOldMouse, event.color)
      })
    }

  }, [])
  // empty array here means this only runs once 


  // mouse efect
  useEffect(() => {
    const canvas = comboRef.current
    const context = canvas.getContext('2d')

    if (mouseData.drawing) {

      draw(context, mouseData, oldMouse, color)

      if (!dev) {
        // @ts-expect-error
        socket.emit('drawing', {
          mouseData: {
            x: mouseData.x / canvas.width,
            y: mouseData.y / canvas.height,
            drawing: mouseData.drawing},
          oldMouse: {
            x: oldMouse.x / canvas.width,
            y: oldMouse.y / canvas.height
          },
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
