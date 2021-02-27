import React, { useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Reset() {
  const { dispatch } = useContext(DispatchContext)
  const { state } = useContext(StateContext)
  const taskCount = state.list.reduce(
    (taskCnt, item) => item.tasks.length + taskCnt,
    0
  )

  function handleResetBoard(e) {
    e.preventDefault()
    dispatch({ type: "reset", command: "resetAll" })
  }
  return (
    <button
      onClick={taskCount > 0 ? handleResetBoard : null}
      style={taskCount > 0 ? {} : { backgroundColor: "silver" }}
      className={
        "btn reset" + (state.editing || state.prompting ? " blurred" : "")
      }
    >
      Reset
    </button>
  )
}
export default Reset
