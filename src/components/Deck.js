import React, { useState, useEffect } from "react"
import Card from "./Card"

function Deck(props) {
  return props.tasks.map((task, taskI) => (
    <Card
      head={props.head}
      tail={props.tail}
      key={task}
      task={task}
      taskI={taskI}
      id={props.id}
      setList={props.setList}
    />
  ))
}
export default Deck
