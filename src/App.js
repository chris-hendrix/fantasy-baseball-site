import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import makeData from './makeData'
import { getSheetColumns, getSheetData } from './googleData'

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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      docId: '1I1G0P8QofhKL2f2EWTLeNGMZ3xedoC5j09FcxN2vigM',
      sheetName: 'Owners',
      columns: [],
      data: [],
      interval: 10000
    }
    console.log('constructor')
    console.log(this.state.columns)
    console.log(this.state.data)
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
    }, this.state.interval)
    this.getData()
  }

  componentWillUnmount() {
      clearInterval(this.timer);
  }

  render() {
    return (
      <Styles>
        {console.log('rendered')}
        {console.log(this.state.columns)}
        {console.log(this.state.data)}
        <Table columns={this.state.columns} data={this.state.data} />
      </Styles>
    )
  }
}

function equalObjects(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}

export default App
