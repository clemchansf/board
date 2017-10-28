import React, {Component} from 'react'
import Navigator from './navigators'

const cardStyle = {
  borderRadius: 6,
  border: '2px solid gray',
  margin: 2,
  height: 30,
}

class Card extends Component {

  render() {
      console.log("Card props", this.props)
      return (<div
        {...this.props}
        className="align-middle"
        style={cardStyle}
      >
        <Navigator
          id={`${this.props.name}`}
          {...this.props}
        >
            {this.props.children}
        </Navigator>
      </div>)
  }
}

export default Card;
