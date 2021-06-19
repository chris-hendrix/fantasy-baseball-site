import React from 'react'
import { getSheetColumns, getSheetData } from './googleData'
import {Table} from './Components/FilterTable'
import styled from 'styled-components'

const Styles = styled.div`
padding: 1rem;
table {
  border-spacing: 0;
  border: 1px solid black;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    :last-child {
      border-right: 0;
    }
  }
}
`

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      docId: '1I1G0P8QofhKL2f2EWTLeNGMZ3xedoC5j09FcxN2vigM',
      sheetName: 'Players',
      columns: [],
      data: [],
      interval: 10000,
      filters: []
    }
  }

  getColumns() {
    getSheetColumns(this.state.docId, this.state.sheetName).then((columns)=>{
      if (!equalObjects(this.state.columns, columns)){
        this.setState({ columns: columns })
      }
    })
  }

  getData() {
    getSheetData(this.state.docId, this.state.sheetName).then((data)=>{
      // check if data has been updated
      if (!equalObjects(this.state.data, data)){
        this.setState({ data: data })
      }
    })
  }

  componentDidMount() {
    console.log('interval')
    console.log(this.state.interval)
    this.getColumns()
    this.timer = setInterval(() => {
      this.getColumns()
      this.getData()
      console.log(this.state.columns)
    }, this.state.interval)
    this.getData()
  }

  componentWillUnmount() {
      clearInterval(this.timer);
  }

  render() {
    return (
      <Styles>
        <Table columns={this.state.columns} data={this.state.data} />
      </Styles>
    )
  }
}

function equalObjects(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}

export default App
