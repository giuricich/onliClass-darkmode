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

  // logs the message to the console, but does it twice??
  // TODO: fix event firing twice 
  window.addEventListener('message', (event : CustomEvent) => {
    console.log('detail:', event.detail);
    
  })

  return (
    // <Chat items={items} />
    <div id="chat">
    <div id="chatRoom">
    </div>
    <div id="messageArea">
      <div>
        <input id="messageBar" autoComplete="off" placeholder="Type here..." />
      </div>
      <div>
        <button id="sendButton" type='button'>Send</button>
      </div>
    </div>
  </div>
  )
}