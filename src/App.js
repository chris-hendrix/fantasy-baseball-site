import React, { Component } from 'react';
import PlayerTable from './Components/PlayerTable';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return (
          <div className="App">
            <PlayerTable/>
          </div>
        );
      }

}

export default App