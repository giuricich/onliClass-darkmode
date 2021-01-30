import React from "react"
import ReactDOM from "react-dom"
import Page from "./page"
import { Provider, teamsDarkV2Theme as theme} from "@fluentui/react-northstar"

ReactDOM.render(
    <Provider theme={theme}>
        <Page />
    </Provider>
    ,
    document.getElementById("root"));