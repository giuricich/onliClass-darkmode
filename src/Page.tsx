import React, { useEffect, useState } from "react"
import { Dialog, Header, Input, Form, Button, Grid, Segment } from "@fluentui/react-northstar"
import Video from "./Video";
import ChatArea from "./Chat"
import ChatClass from "./ChatClass";

const startWithDialog = true;

function Page() {
  const [open, setOpen] = useState(startWithDialog)
  const [host, setHost] = useState()

  useEffect(() => {
    window.addEventListener('role', (event: CustomEvent) => setHost(event.detail.is_host))
  }, [])

  const formFields = [
    {
      label: "Enter Your Name",
      name: "name",
      id: "name-input",
      key: "name",
      required: true,
      control: {
        as: Input
      }
    },
    {
      label: "Enter Room Number",
      name: "roomNumber",
      id: "number-input",
      key: "room-number",
      required: true,
      control: {
        as: Input
      }
    },
    {
      control: {
        as: Button,
        content: 'Submit'
      },
      key: 'submit'
    }
  ]

  const gridItems = [
    <Segment 
      color="red"
      inverted
      key='0'
    />,
    <Video 
      styles={{gridColumn: 'span 2'}}
      host={host}
      key='1'
    />,
    <Segment
      color="green"
      styles={{gridColumn: 'span 2'}}
      inverted
      key='2'
    />,
    <ChatClass 
    key='3'
    />
  ]

  return (
    <div id='page'>
      <Header content="OnliClass" align='center' />
      <div id='content'
        style={{margin: '0px 6vw'}}
      >
        <Dialog
          content={
            <Form
              fields={formFields}
              onSubmit={() => {
                setOpen(false) 
                console.log('click!')
              }}
            />
          }
          open={open}
          trapFocus={true}
        />
        <Grid 
          content={gridItems}
          columns="1fr 0.15fr 0.85fr" rows="40vh 40vh"
        />
      </div>
    </div>
  )
}

export default Page