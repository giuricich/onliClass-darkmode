import React, { Component, createRef, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, Chat, ChatItemProps, Divider, Input, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatClass(props) {

  const [items, setItems] = useState([])
  const [input, setInput] = useState("")

  const clearText = (e : FormEvent<HTMLInputElement>) => {
    // does not clear input
    e.currentTarget.value = ''
  }

  // adds message to the list of messages
  window.addEventListener('message', (event: CustomEvent) => {
    event.stopImmediatePropagation();
    console.log('detail:', event.detail);
    setInput("")

    setItems(currentItems => [
      ...currentItems,
      {
        message: <Chat.Message content={event.detail.message} author={event.detail.username} timestamp={new Date().toLocaleTimeString()} mine />,
        contentPosition: 'end',
        key: 'message-id-' + currentItems.length
        // does not givee the count of the items array, probably has something to do with it being inside an event callbackfunction??
        // TODO: fix key generation
      }
    ])
  })

  
  
  return (
    <div>
      <div style={{ height: "100%", width: "100%", overflow: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>
      <Input onChange={ e => { setInput((e.target as HTMLInputElement).value)}} value={input} id="messageBar" label="Type a message" labelPosition="inside" />
    </div>
  )
}