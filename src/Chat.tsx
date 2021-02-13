import React, { CSSProperties, ReactPropTypes } from 'react'
import {Chat, ChatItemProps, ShorthandCollection} from '@fluentui/react-northstar'

const items : ShorthandCollection<ChatItemProps> = [
  {
    message: <Chat.Message content="Hello" author="John Doe" timestamp="10:15 PM"  />,
    contentPosition: 'end',
    key: 'message-id-1',
  },
  {
    message: <Chat.Message content="Hello, Are you there?" author="John Doe" timestamp="10:15 PM"  />,
    contentPosition: 'end',
    key: 'message-id-1',
  }
]


const messageRecieved = () => {
  console.log('we got a message')
}

export default function ChatArea(props) {
  const ref = React.useRef<HTMLUListElement>()

  // const messageEvent = new CustomEvent('message', {detail: {type : 'test'}})

  React.useEffect( () => {
    // ref.current.addEventListener('message', messageRecieved, {passive : true})
    // ref.current.style.background = 'red'
    ref.current &&
    console.log(ref.current.style.background, 'effect has been used');
    
  })

  return (
    <Chat ref={ref} items={items} />
  )
}