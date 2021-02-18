import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import Board from "./components/Board"
import Deck from "./components/Deck"
import CreateCard from "./components/CreateCard"
import data from "./data"
import "./assets/css/main.css"

function Main(props) {
  const persistedList = localStorage.getItem("boardappList")
  const [list, setList] = useState(
    (persistedList && JSON.parse(persistedList)) || data
  )

  useEffect(() => {
    document.title = `${props.title}`
    window.scrollTo(0, 0)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Board title="Board App">
      {list.map((item, itemI) => (
        <div key={item.id} className="container">
          <div className="header blurred" style={item.style}>
            {item.name}
          </div>
          <Deck
            head={itemI === 0}
            tail={itemI === list.length - 1}
            id={itemI}
            tasks={item.tasks}
            setList={setList}
            color={item.style.backgroundColor}
          />
          {item.name !== "Open" ? "" : <CreateCard setList={setList} />}
        </div>
      ))}
      <div className="overlay overlay--visible">
        <div className="overlay-inner">
          <p className="end-message"></p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Task Content</small>
              </label>
              <textarea
                onChange={e => setBody(e.target.value)}
                name="body"
                id="post-body"
                className="body-content tall-textarea form-control"
                type="text"
              ></textarea>
            </div>
            <div className="control">
              <button className="del">Delete</button>
              <button className="canc">Cancel</button>
              <button className="save">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Board>
  )
}

ReactDOM.render(<Main title="Board App" />, document.querySelector("#root"))
