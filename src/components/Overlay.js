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

  function handleSave(e) {
    e.preventDefault()
    const { deckI, taskI } = state.editCard
    dispatch({ type: "update", card: { deckI, taskI, content } })
  }

  function handleDelete(e) {
    e.preventDefault()
    const { deckI, taskI } = state.editCard
    dispatch({ type: "delete", card: { deckI, taskI } })
  }

  return (
    <div className={"overlay" + (state.editing ? " overlay--visible" : "")}>
      <div className="overlay-inner">
        <p className="end-message"></p>
        <form onSubmit={e => e}>
          <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
              <small>Task Content</small>
            </label>
            <textarea
              name="body"
              id="post-body"
              className="body-content tall-textarea form-control"
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="control">
            <button
              onClick={() => dispatch({ type: "cancelEdit" })}
              className="canc"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="del">
              Delete
            </button>
            <button onClick={handleSave} className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Overlay
