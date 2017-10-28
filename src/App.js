import React, {Component} from 'react'
import result from './data'

import {heightStyle,cardStyle,alignStyle} from './styles'
import {LeftArrow,RightArrow} from './arrows'
import {Header} from './header'

let element = null

class Columns extends Component {

  constructor (props) {
    super(props)

    // convert children array into a map width index being the corresponding key
    let tempMap = props.data.reduce((accumulator, item, index) => {
      accumulator[index] = [...item.children]
      return accumulator
    }, {})

    this.state = {
      childrenMap: tempMap,
      data: props.data
    }
  }

  addItem = (idx, inpTxt, prevChildrenMap) => {
    let childrenMap = {...prevChildrenMap}
    if (prevChildrenMap[idx].findIndex((item) => item === inpTxt) === -1) {
      childrenMap[idx] = [...childrenMap[idx], inpTxt]
    }
    return childrenMap
  }

  handleAdd = (inp) => {
    let inputText = prompt ("please enter a new entry!")
    if (inputText) {
      let childrenMap = this.addItem(inp.idx, inputText, this.state.childrenMap)
      this.setState({childrenMap})
    }
  }

  delItem = (x, y, prevChildrenMap) => {

     let childrenMap = {...prevChildrenMap}
     let newChildren = prevChildrenMap[x].filter((item,idx) => {
                                              return idx !== y
                                            })
     childrenMap[x] = newChildren
     return childrenMap
  }


  handleLeft = (e) => {
    e.preventDefault()
    let {key, offset} = this.toObject(e.target.id)
    let targetedInput = this.state.childrenMap[key][offset]
    let childrenMap = this.addItem(key - 1, targetedInput, this.delItem(key, offset, this.state.childrenMap))
    this.setState({childrenMap})
  }

  handleRight= (e) => {
    e.preventDefault()
    console.log("id ", e.target.id)
    let {key, offset} = this.toObject(e.target.id)
    let targetedInput = this.state.childrenMap[key][offset]
    let childrenMap = this.addItem(key + 1, targetedInput, this.delItem(key, offset, this.state.childrenMap))
    this.setState({childrenMap})
  }

  toObject = jsonString => JSON.parse(jsonString)

  render() {

    let columns = Object.keys(this.state.childrenMap).map((key, idx) => {

      let length = Object.keys(this.state.childrenMap).length

      let children = this.state.childrenMap[key].map((child, innerIdx) => {

        function generateID(nav) {
          let key = idx, offset = innerIdx
          console.log("key offset nav", key, offset, nav)
          return JSON.stringify({key, offset, nav})
        }

        return <div key={`${idx},${innerIdx}`}
                ref={(el) => element = el}
                style={Object.assign({}, cardStyle, heightStyle, alignStyle)}
                >
                  {(idx > 0) ? <LeftArrow id={generateID('left')} onClick={this.handleLeft}/> : null}
                  {child}
                  {(idx < length - 1) ? <RightArrow id={generateID("right")} onClick={this.handleRight}/> : null}
                </div>
      })

      return <div key={idx} className="col-md-3">
        <Header {...this.state.data[idx]}/>
        {children}
        <button onClick={this.handleAdd.bind(this,{idx})} className="btn btn-primary">+add</button>
      </div>
    })
    return (
      <div className="row">
        {columns}
      </div>
    )
  }
}

const App = () => {
    return <div className="fluid-container" style={{margin: 25}}>
      <Columns data={result}/>
    </div>
}

export default App
