import React, { useContext, useEffect, useState } from "react"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Overlay() {
  const [content, setContent] = useState("")
  const { dispatch } = useContext(DispatchContext)
  const { state } = useContext(StateContext)

  useEffect(() => {
    const { deckI, taskI } = state.editCard
    setContent(state.list[deckI].tasks[taskI])
  }, [state.editCard])

  function handleCancel(e) {
    e.preventDefault()
    dispatch({ type: "cancel", command: "edit" })
  }

  function handleDelete(e) {
    e.preventDefault()
    const { deckI, taskI } = state.editCard
    dispatch({ type: "delete", card: { deckI, taskI } })
  }

  function handleSave(e) {
    e.preventDefault()
    const { deckI, taskI } = state.editCard
    dispatch({ type: "update", card: { deckI, taskI, content } })
  }
  return (
    <div className={"overlay" + (state.editing ? " overlay--visible" : "")}>
      <div className="overlay-inner">
        <p className="end-message"></p>
        <form>
          <div className={"form-group" + (state.prompting ? " blurred" : "")}>
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
              <small>Task Content</small>
            </label>
            <div className={state.prompting ? " blurred" : ""}>
              <textarea
                name="body"
                id="post-body"
                className={"body-content tall-textarea form-control"}
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="control">
            <div className={state.prompting ? " blurred" : ""}>
              <button onClick={handleCancel} className="canc">
                Cancel
              </button>
            </div>
            <button
              onClick={handleDelete}
              className={"del" + (state.prompting ? " blurred" : "")}
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className={"save" + (state.prompting ? " blurred" : "")}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Overlay
