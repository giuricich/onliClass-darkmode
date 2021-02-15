import React, { Component, createRef, FormEvent, useState } from 'react'
import { Chat, ChatItemProps, Input, ShorthandCollection } from '@fluentui/react-northstar'




export default function ChatClass(props) {

  const [items, setItems] = useState([])

  const clearText = (e : FormEvent<HTMLInputElement>) => {
    // does not clear input
    e.currentTarget.value = ''
  }

  // logs the message to the console, but does it twice??
  // TODO: fix event firing twice 
  window.addEventListener('message', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    console.log('detail:', event.detail);
    setItems(currentItems => [
      ...currentItems,
      {
        message: <Chat.Message content={event.detail.message} author={event.detail.username} timestamp={new Date().toLocaleTimeString()} mine />,
        contentPosition: 'end',
        key: 'message-id-' + items.length
      }
    ])

  })

  return (
    <div>
      <div style={{ height: "100%", width: "100%", overflow: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>
      <Input onSubmit={clearText} id="messageBar" label="Type a message" labelPosition="inside" clearable/>
    </div>
  )
}