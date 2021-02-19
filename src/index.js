import React, { useEffect, useState, useReducer } from "react"
import ReactDOM from "react-dom"
import Board from "./components/Board"
import Deck from "./components/Deck"
import CreateCard from "./components/CreateCard"
import data from "./data"
import "./assets/css/main.css"

import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"

function Main(props) {
  const persistedList = localStorage.getItem("boardappList")
  const initialState = {
    list: (persistedList && JSON.parse(persistedList)) || data
  }

  function reducer(state, action) {
    const { deckI, taskI, content } = action.card

    // clone prev list
    let newList = JSON.parse(JSON.stringify(state.list))
    let movedItem

    switch (action.type) {
      case "moveLeft":
        // sub from current by splicing out itself
        movedItem = newList[deckI].tasks.splice(taskI, 1)
        // add spliced out item to the left [id - 1] item
        newList[deckI - 1].tasks.push(movedItem)
        return { list: newList }

      case "moveRight":
        // sub from current by splicing out itself
        movedItem = newList[deckI].tasks.splice(taskI, 1)
        // add spliced out item to the right [id + 1] item
        newList[deckI + 1].tasks.push(movedItem)
        localStorage.setItem("boardappList", JSON.stringify(newList))
        return { list: newList }

      case "create":
        newList[0].tasks.push(content)
        return { list: newList }

      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    document.title = `${props.title}`
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    localStorage.setItem("boardappList", JSON.stringify(state.list))
  }, [state.list])

  return (
    <StateContext.Provider value={{ state }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <Board title="Board App">
          {state.list.map((item, itemI) => (
            <div key={item.id} className="container">
              <div className="header" style={item.style}>
                {item.name}
              </div>
              <Deck
                head={itemI === 0}
                tail={itemI === state.list.length - 1}
                id={itemI}
                tasks={item.tasks}
                color={item.style.backgroundColor}
              />
              {item.name !== "Open" ? "" : <CreateCard />}
            </div>
          ))}
        </Board>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main title="Board App" />, document.querySelector("#root"))
