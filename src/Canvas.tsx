import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'

//todo move over logic for drawing into here

const Canvas = forwardRef<HTMLCanvasElement>((props, ref) => (
  <canvas id="inner-canvas" ref={ref}></canvas> 
)) 

export default Canvas
//todo name this so its not just anonamous