import React, {Component} from 'react'
import {heightStyle,cardStyle,alignStyle} from './styles'
import {LeftArrow,RightArrow} from './arrows'
import {Header} from './header'
import Card from './card'

class Deck extends Component {

  constructor(props) {
    super(props)
    let id = parseInt(props.id)
    let cards = props.childrenMap[id]
    this.state = {id,cards}
  }

  isSame = (arrA, arrB) => {
    return arrA.length === arrB.length &&
           arrA.every((v, i) => arrB[i] === v)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // memoization check
    let updateStatus = !this.isSame(nextProps.childrenMap[nextState.id], nextState.cards)
    if (updateStatus) {
      this.setState({cards: nextProps.childrenMap[nextState.id]}) // update cache in state.cards
    }
    return updateStatus
  }

  render() {

    let {id, childrenMap, handleAdd, handleLeft, handleRight} = this.props
    let length = Object.keys(childrenMap).length

    console.log(`deck render id:${id} length:${length}`)
    let children = childrenMap[id].map((child, innerIdx) => {

      const generateID = (nav) => {
        let offset = innerIdx
        console.log(`offset:${offset}, arrow:${nav} > ${child}`)
        return JSON.stringify({id, offset, nav})
      }

      const combineStyles = () => {
        return Object.assign({}, cardStyle, heightStyle, alignStyle)
      }

      const combineIds = () => `${id},${innerIdx}`

      const needLeftNavigator = (x,y) => {
          return x > y
      }
      const needRightNavigator = (x, y) => {
          return parseInt(x, 10) < (y -1)
      }

      return <Card
                key={combineIds()}
                style={combineStyles()}
              >{
                  needLeftNavigator(id, 0)
                  ? <LeftArrow
                      id={generateID('left')}
                      onClick={handleLeft}/>
                  : null
               }
               {child} {
                  needRightNavigator(id , length)
                  ? <RightArrow
                      id={generateID("right")}
                      onClick={handleRight}/>
                  : null
               }
              </Card>
    })

    return <div key={id} className="col-md-3">
      <Header {...this.props.data[parseInt(id, 0)]}/>
      {children}
      <button id={id} onClick={(e) => {
            handleAdd(e.target.id)
          }} className="btn btn-primary">+add</button>
    </div>
  }
}

export default Deck
