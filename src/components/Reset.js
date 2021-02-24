import React, { useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Reset() {
  const { dispatch } = useContext(DispatchContext)
  const { state } = useContext(StateContext)

  function handleResetBoard(e) {
    e.preventDefault()
    dispatch({ type: "reset", command: "resetAll" })
  }
  return (
    <button
      onClick={handleResetBoard}
      className={
        "btn reset" + (state.editing || state.prompting ? " blurred" : "")
      }
    >
      Reset
    </button>
  )
}
export default Reset
