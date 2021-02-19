import React from "react"
import Card from "./Card"

function Deck(props) {
  return props.tasks.map((task, taskI) => (
    <Card
      head={props.head}
      tail={props.tail}
      key={`${task}${taskI}`}
      task={task}
      taskI={taskI}
      id={props.id}
      color={props.color}
    />
  ))
}
export default Deck
