import React from "react"
import {Dialog, Header, Input} from "@fluentui/react-northstar"


function Page() {
    return (
    <div id='page'>
        <Header content="OnliClass" align='center'/>
        <div id='content'>
            <Dialog 
                content={

                        <Input label="Enter Your Name" />

                }
                open={true}
            />
            <p>this is content</p>
        </div>
    </div>
    )
}

export default Page