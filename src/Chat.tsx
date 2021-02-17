import React, { CSSProperties, ReactPropTypes, useState } from 'react'
import { Chat, ChatItemProps, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatArea(props) {

  // const [items, setItems] = useState([])



  // logs the message to the console, but does it twice??
  // TODO: fix event firing twice 

  // window.addEventListener('message', (event: CustomEvent) => {
  //   event.stopImmediatePropagation();
  //   console.log('detail:', event.detail);
  //   setItems([
  //     {
  //       message: <Chat.Message content={event.detail.message} author={event.detail.username} timestamp={new Date().toLocaleTimeString()} />,
  //       contentPosition: 'end',
  //       key: 'message-id-' + items.length
  //     }
  //   ])

  // })

  return (
    // <Chat items={items} />
    <div id="chat">
      <div id="chatRoom">
      </div>
      <div id="messageArea">
        <div>
          <input autoComplete="off" placeholder="Type here..." />
        </div>
        <div>
          <button id="sendButton" type='button'>Send</button>
        </div>
      </div>
    </div>
  )
}