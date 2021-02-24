import React, { useContext } from "react"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Card(props) {
  const { dispatch } = useContext(DispatchContext)
  const { state } = useContext(StateContext)

  function handleClickLeft(e) {
    e.preventDefault()
    dispatch({
      type: "moveLeft",
      card: { deckI: props.id, taskI: props.taskI }
    })
  }
  function handleClickRight(e) {
    e.preventDefault()
    dispatch({
      type: "moveRight",
      card: { deckI: props.id, taskI: props.taskI }
    })
  }
  function handleEdit(e) {
    e.preventDefault()
    dispatch({
      type: "edit",
      card: { deckI: props.id, taskI: props.taskI }
    })
  }
  return (
    <div
      className={"card" + (state.editing || state.prompting ? " blurred" : "")}
    >
      {props.head ? (
        <span> </span>
      ) : (
        <span style={{ color: props.color }} onClick={handleClickLeft}>
          {"◄"}
        </span>
      )}
      <p onClick={handleEdit}>{props.task}</p>
      {props.tail ? (
        <span> </span>
      ) : (
        <span style={{ color: props.color }} onClick={handleClickRight}>
          {"►"}
        </span>
      )}
    </div>
  )
}
export default Card
