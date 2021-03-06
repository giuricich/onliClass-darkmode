import React, { Component, createRef, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, Button, Chat, ChatItemProps, Divider, Input, Text, Segment, SendIcon, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatClass(props) {


  const [items, setItems] = useState([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState([])

  const COLORS = [
    '#E73550', '#8E192E', '#CC4A31', '#664134',
    '#0A5707', '#237B4B', '#6264a7', '#C54058',
    '#7478C1', '#3E2D3B', '#943670', '#B4009E'
  ];

  const ELIPSE = '... '

  const usernameColor = username => {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // only runs on initial render
  // hooks up logic for when the 'message' event gets triggered
  useEffect(() => {

    //_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
    console.clear()
    //_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*

    window.addEventListener('message', (event: CustomEvent) => {
      const meta = event.detail.meta;
      const data = event.detail.data;
      event.stopImmediatePropagation();

      console.log('data:', data);
      console.log('kind:', meta);

      // path for chat messages
      if (meta.kind === 'sent' || meta.kind === 'received') {
        setItems(currentItems => {

          // this clears the input if the user is sending a message
          meta.kind === 'sent' && setInput("") 

          // this is for the first time it runs and there is nothing in the currentItems array
          let lastItem = { message: { props: { author: null } }, children: {} }

          // if there is at least one element in currentItem, lastItem is set to the last element in the array
          if (currentItems.length - 1 >= 0) {
            lastItem = currentItems[currentItems.length - 1]
          }

          let message = {
            message: <Chat.Message content={data.message} author={data.username} timestamp={new Date().toLocaleTimeString()} styles={{ backgroundColor: usernameColor(data.username) }} mine={meta.kind === "sent"} />,
            contentPosition: meta.kind === "sent" ? 'end' : 'start',
            attached: (!lastItem.children && (lastItem.message.props.author === data.username)),   // possible problem area on this line            
            key: 'message-id-' + currentItems.length
          }

          console.log('last item', lastItem);

          return [...currentItems, message]
        })
      }
      // path for chat information 
      else {
        setItems(currentItems => [...currentItems,
        {
          // TODO: figure out how to set colors using the 'color' prop
          children: <Divider content={data.message} color="brand" important />,
          key: 'message-id-' + currentItems.length
        }
        ])
      }
    })


    // TODO: segment style jumps around when it gets populated with a text component for the first time
    window.addEventListener('typing', (event: CustomEvent) => {
      const username = event.detail.username + ELIPSE
      const isTyping = event.detail.current

      if (isTyping) {
        setTyping(currentTyping => {
          return [...currentTyping, username]
        })
      }
      else {
        setTyping(currentTyping => currentTyping.filter(element => element !== username))
      }
    })
  }, [])

  //TODO: fix annoying popup when publisher role is not avaliable

  return (
    <div style={{ display: "flex", flexDirection: 'column' }}>

      <div id="chat-container" style={{ height: "100%", overflowY: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>


      <div className="bottom-chat" style={{ display: "flex", alignItems: 'center' }}>
        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }} value={input} id="message-input" placeholder="Type a message..." />
        <Button onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: "Enter" }))} icon={<SendIcon />} iconOnly primary text />
        <Text content={typing} />
      </div>

    </div>
  )
}