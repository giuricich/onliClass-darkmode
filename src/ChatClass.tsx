import React, { Component, createRef } from 'react'
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
    key: 'message-id-2',
  }
]

export default class extends Component {

  private testRef = document.querySelector('.ui-header')

  componentDidMount() {
    // attach event to ref
    console.log('ref = ', this.testRef);
    
  }

  render() {
    return (

        <Chat items={items} />

      
    )
  }
}