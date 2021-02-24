import React, { useContext, useEffect, useState } from "react"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Prompt() {
  const { dispatch } = useContext(DispatchContext)
  const { state } = useContext(StateContext)
  const [message, setMessage] = useState()

  useEffect(() => {
    setMessage(state.promptMessage)
  }, [state.promptMessage])

  function handleCancel(e) {
    e.preventDefault()
    dispatch({ type: "cancel", command: state.command })
  }

  function handleContinue(e) {
    e.preventDefault()
    dispatch({ type: "continue", command: state.command })
  }
  return (
    <div className={"overlay" + (state.prompting ? " overlay--visible" : "")}>
      <div className="overlay-inner">
        <p className="end-message">{message}</p>
        <button className="cancel-prompt" onClick={handleCancel}>
          Cancel
        </button>
        <button className="prompt" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}
export default Prompt
