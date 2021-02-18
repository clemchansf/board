import React, { useState, useEffect, useRef } from "react"

function CreateCard(props) {
  const [newItem, setNewItem] = useState("")
  const itemInput = useRef(null)
  useEffect(() => {
    setTimeout(() => itemInput.current.focus(), 0)
  }, [])

  function handleAdd(e) {
    e.preventDefault()

    if (!Boolean(newItem)) return

    props.setList(prev => {
      let newList = JSON.parse(JSON.stringify(prev))
      newList[0].tasks.push(newItem)
      localStorage.setItem("boardappList", JSON.stringify(newList))
      return newList
    })
    setNewItem("")
    itemInput.current.focus()
  }
  return (
    <div className="create-item">
      <form className="blurred" onSubmit={handleAdd}>
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
