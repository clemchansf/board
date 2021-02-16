import React, { useState, useEffect } from "react"

function Card(props) {
  function handleClickLeft(e) {
    e.preventDefault()
    props.setList(prev => {
      // clone prev list
      let newList = JSON.parse(JSON.stringify(prev))
      // sub from current by splicing out itself
      let movedItem = newList[props.id].tasks.splice(props.taskI, 1)
      // add spliced out item to the left [id - 1] item
      newList[props.id - 1].tasks.push(movedItem)
      return newList
    })
  }
  function handleClickRight(e) {
    e.preventDefault()
    props.setList(prev => {
      // clone prev list
      let newList = JSON.parse(JSON.stringify(prev))
      // sub from current by splicing out itself
      let movedItem = newList[props.id].tasks.splice(props.taskI, 1)
      // add spliced out item to the right [id + 1] item
      newList[props.id + 1].tasks.push(movedItem)
      return newList
    })
  }
  return (
    <div className="card">
      {props.head ? (
        <span> </span>
      ) : (
        <span onClick={handleClickLeft}>{"◄"}</span>
      )}
      <p>{props.task}</p>
      {props.tail ? (
        <span> </span>
      ) : (
        <span onClick={handleClickRight}>{"►"}</span>
      )}
    </div>
  )
}
export default Card
