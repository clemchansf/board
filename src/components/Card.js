import React, { useContext } from "react"

import DispatchContext from "../DispatchContext"

function Card(props) {
  const { dispatch } = useContext(DispatchContext)

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
  return (
    <div className="card">
      {props.head ? (
        <span> </span>
      ) : (
        <span style={{ color: props.color }} onClick={handleClickLeft}>
          {"◄"}
        </span>
      )}
      <p>{props.task}</p>
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
