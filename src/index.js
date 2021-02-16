import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import Board from "./components/Board"
import Deck from "./components/Deck"
import data from "./data"

function Main(props) {
  const [list, setList] = useState(data)
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
        </div>
      ))}
    </Board>
  )
}

ReactDOM.render(<Main title="Board App" />, document.querySelector("#root"))
