import React, {Component} from 'react'
import Deck from './deck'
class Board extends Component {

  constructor (props) {
    super(props)

    // flattern array into an object, using index as the key
    let tempMap = props.data.reduce((accumulator, item, index) => {
      accumulator[index] = [...item.children]
      return accumulator
    }, {})

    this.state = {
      childrenMap: tempMap,
      data: props.data // keep a reference to the original
    }
  }

  addItem = (idx, inpTxt, prevChildrenMap) => {
    console.log(idx, inpTxt, prevChildrenMap )
    let childrenMap = {...prevChildrenMap}
    if (prevChildrenMap[idx].findIndex((item) => item === inpTxt) === -1) {
      childrenMap[idx] = [...childrenMap[idx], inpTxt]
    }
    return childrenMap
  }

  deleteItem = (x, y, prevChildrenMap) => {

     let childrenMap = {...prevChildrenMap}
     let newChildren = prevChildrenMap[x].filter((item,idx) => {
                                              return idx !== y
                                            })
     childrenMap[x] = newChildren
     return childrenMap
  }

  handleAdd = (id) => {
    let inputText = prompt ("please enter a new entry!")
    if (inputText) {
      let childrenMap = this.addItem(id,
                                    inputText,
                                    this.state.childrenMap)
      this.setState({childrenMap})
    }
  }

  handleClick = (idObject, func) => {
    let {id, offset} = this.toObject(idObject)
    let targetedInput = this.state.childrenMap[id][offset]
    let childrenMap = this.addItem(
                                   func(parseInt(id), 1),
                                   targetedInput,
                                   this.deleteItem(id,
                                                   offset,
                                                   this.state.childrenMap))
    this.setState({childrenMap})
  }
  handleLeft = (e) => {
      this.handleClick(e.target.id, (x,y) => x - y)
  }
  handleRight = (e) => {
      this.handleClick(e.target.id, (x,y) => (x) + (y))
  }

  toObject = jsonString => JSON.parse(jsonString)

  render() {
    const handleAddClick = (inp) => {
        this.handleAdd(inp)
    }

    let board = Object.keys(this.state.childrenMap).map((key, idx) => {

      return <Deck
                key={key}
                id={key}
                handleAdd={handleAddClick}
                handleLeft={this.handleLeft}
                handleRight={this.handleRight}
                {...this.state} />
    })

    return (
      <div className="row">
        {board}
      </div>
    )
  }
}

export default Board
