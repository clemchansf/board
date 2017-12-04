import React, {Component} from 'react'
import result from './data'
import Board from './board'

const App = () => {
    return <div className="fluid-container" style={{margin: 25}}>

      <Board data={result}/>
    </div>
}

export default App
