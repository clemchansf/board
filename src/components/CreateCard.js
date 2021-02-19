import React, { useState, useEffect, useRef, useContext } from "react"

import DispatchContext from "../DispatchContext"

function CreateCard(props) {
  const { dispatch } = useContext(DispatchContext)

  const [newItem, setNewItem] = useState("")
  const itemInput = useRef(null)
  useEffect(() => {
    setTimeout(() => itemInput.current.focus(), 0)
  }, [])

  function handleAdd(e) {
    e.preventDefault()

    if (!Boolean(newItem)) return

    dispatch({ type: "create", card: { content: newItem } })

    setNewItem("")
    itemInput.current.focus()
  }
  return (
    <div className="create-item">
      <form onSubmit={handleAdd}>
        <input
          ref={itemInput}
          onChange={e => setNewItem(e.target.value)}
          value={newItem}
        />
        <button onClick={handleAdd} className="btn btn-primary">
          +
        </button>
      </form>
    </div>
  )
}
export default CreateCard
