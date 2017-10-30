import React, {Component} from 'react'
import {heightStyle,cardStyle,alignStyle} from './styles'
import {LeftArrow,RightArrow} from './arrows'
import {Header} from './header'
import Card from './card'

class Deck extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {

    let {id, childrenMap, handleAdd, handleLeft, handleRight, ...restProps} = this.props
    let length = Object.keys(childrenMap).length


    console.log(`deck render id:${id} length:${length}`)
    let children = childrenMap[id].map((child, innerIdx) => {

      const generateID = (nav) => {
        let offset = innerIdx
        console.log("offset nav", offset, nav)
        return JSON.stringify({id, offset, nav})
      }

      const combineStyles = () => {
        return Object.assign({}, cardStyle, heightStyle, alignStyle)
      }

      const combineIds = () => `${id},${innerIdx}`

      const memoizeLeftClick = (e) => {
          handleLeft(e)
      }
      const memoizeRightClick = (e) => {
          handleRight(e)
      }
      const needLeftNavigator = (x,y) => {
        // console.log(`     idx: ${x}, needLeftNavigator
        //                 typeof id ${x}: ${typeof x}
        //                 typeof length ${y}: ${typeof y}
        //                 lenght ${y},
        //                 condition(${x} > (${y}): ${parseInt(x) > y}`)
          return x > y
      }
      const needRightNavigator = (x, y) => {
          // console.log(`    idx: ${x}, needRightNavigator
          //                 typeof ${x}: ${typeof x}
          //                 typeof ${y}: ${typeof y}
          //                 lenght ${y},
          //                 (length-1): ${y-1},
          //                 condition(${x} < (${y} - 1)): ${parseInt(x) < (y -1)}`)
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
