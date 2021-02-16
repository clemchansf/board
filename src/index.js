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

  return (
    <Board title="Board App">
      {list.map((item, itemI) => (
        <div key={item.id} className="container">
          <div className="header" style={item.style}>
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
    </Board>
  )
}

ReactDOM.render(<Main title="Board App" />, document.querySelector("#root"))
