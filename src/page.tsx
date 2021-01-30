import React, { useState } from "react"
import { Dialog, Header, Input, Form, Button, Grid } from "@fluentui/react-northstar"



function Page() {
  const [open, setOpen] = useState(true)

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

  return (
    <div id='page'>
      <Header content="OnliClass" align='center' />
      <div id='content'>
        <Dialog
          content={
            <Form
              fields={formFields}
              onSubmit={() => setOpen(false)}
            />
          }
          open={open}
          trapFocus={true}
        />
        <Grid />
        <p>this is content</p>
      </div>
    </div>
  )
}

export default Page