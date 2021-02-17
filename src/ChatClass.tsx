import React, { Component, createRef, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, Chat, ChatItemProps, Divider, Input, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatClass(props) {

  const [items, setItems] = useState([])
  const [input, setInput] = useState("")


  // only runs on initial render
  // hooks up logic for when the 'message' event gets triggered
  useEffect( () => {
    
    //_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
    console.clear()
    //_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*

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
        }
      ])
    })
  }, [])

  return (
    <div>
      <div id="chat-container" style={{ height: "100%", width: "100%", overflowY: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>
      <Input inverted onChange={ (e : React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value)}} value={input} id="message-input" label="Type a message" labelPosition="inside" />

    </div>
  )
}