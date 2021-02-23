import React, { Component, createRef, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, Chat, ChatItemProps, Divider, Input, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatClass(props) {

  const [items, setItems] = useState([])
  const [input, setInput] = useState("")

  const COLORS = [
    '#E73550', '#8E192E', '#CC4A31', '#664134',
    '#0A5707', '#237B4B', '#6264a7', '#C54058',
    '#7478C1', '#3E2D3B', '#943670', '#B4009E'
  ];

  const usernameColor = (username) => {
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

      if (meta.kind === 'sent' || meta.kind === 'received') {
        setInput("")
        setItems(currentItems => {
          // this is for the first time it runs and there is nothing in the currentItems array
          // probs a better way to do this, but whatevs for now
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
      else {
        setItems(currentItems => [...currentItems,
        {
          children: <Divider content={data.message} color={meta.kind === 'welcome' ? 'brand' : 'grey'} important={meta.kind === 'welcome'} />,
          key: 'message-id-' + currentItems.length
        }
        ])
      }
    })
  }, [])


  //TODO: finalize input below chat, and add typing indicators 

  return (
    <div style={{ height: "100%", width: "100%" }}>

      <div id="chat-container" style={{ height: "100%", width: "100%", overflowY: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>

      <div style={{}}>
        <Input inverted onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }} value={input} id="message-input" label="Type a message" labelPosition="inside" />
      </div>

    </div>
  )
}