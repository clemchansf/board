import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import Board from "./components/Board"
import Deck from "./components/Deck"
import CreateCard from "./components/CreateCard"
import Overlay from "./components/Overlay"
import data from "./data"
import "./assets/css/main.css"

import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"

function Main(props) {
  const persistedList = localStorage.getItem("boardappList")
  const initialState = {
    editCard: { deckI: 0, taskI: 0 },
    editing: false,
    list: (persistedList && JSON.parse(persistedList)) || data
  }

  function reducer(draft, action) {
    const { deckI, taskI, content } = action.card || {}
    let movedItem

    switch (action.type) {
      case "cancelEdit":
        draft.editing = false
        return

      case "create":
        draft.list[0].tasks.push(content)
        return

      case "delete":
        draft.list[deckI].tasks.splice(taskI, 1)
        draft.editing = false
        return

      case "edit":
        draft.editing = true
        draft.editCard.deckI = deckI
        draft.editCard.taskI = taskI
        return

      case "update":
        draft.editing = false
        draft.list[deckI].tasks[taskI] = content
        return

      case "moveLeft":
        movedItem = draft.list[deckI].tasks.splice(taskI, 1)
        draft.list[deckI - 1].tasks.push(movedItem)
        return

      case "moveRight":
        movedItem = draft.list[deckI].tasks.splice(taskI, 1)
        draft.list[deckI + 1].tasks.push(movedItem)
        return

      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

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
              <div
                className={"header" + (state.editing ? " blurred" : "")}
                style={item.style}
              >
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
        <Overlay />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main title="Board App" />, document.querySelector("#root"))
