import React, { Component, createRef, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Avatar, Chat, ChatItemProps, Divider, Input, ShorthandCollection } from '@fluentui/react-northstar'

export default function ChatClass(props) {

  const [items, setItems] = useState([])
  const [input, setInput] = useState("")

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

      if (meta.kind !== 'sent' && meta.kind !== 'received') {
        setItems(currentItems => [...currentItems,
        {
          children: <Divider content={data.message} color={meta.kind === 'welcome' ? 'brand' : 'grey'} important={meta.kind === 'welcome'} />,
          key: 'message-id-' + currentItems.length
        }
        ])
      }
      else {
        setInput("")
        setItems(currentItems => {
          // this is for the first time it runs and there is nothing in the currentItems array
          // probs a better way to do this, but whatevs for now
          let lastItem = { message: { props: { author: null } }, children:{} }

          // if there is at least one element in currentItem, lastItem is set to the last element in the array
          if (currentItems.length - 1 >= 0) {
            lastItem = currentItems[currentItems.length - 1]
          }

          let message = {
            message: <Chat.Message content={data.message} author={data.username} timestamp={new Date().toLocaleTimeString()} mine={meta.kind === "sent"} />,
            contentPosition: meta.kind === "sent" ? 'end' : 'start',
            attached: (!lastItem.children && (lastItem.message.props.author === data.username)),
            // can't access lastItem.message if the last message was 
            key: 'message-id-' + currentItems.length
          }

          console.log('last item', lastItem);

          return [...currentItems, message]
        })
      }


    })
  }, [])


  return (
    <div>
      <div id="chat-container" style={{ height: "100%", width: "100%", overflowY: 'scroll' }}>
        <Chat items={items} styles={{ minHeight: '100%' }} />
      </div>
      <Input inverted onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.target.value) }} value={input} id="message-input" label="Type a message" labelPosition="inside" />

    </div>
  )
}