import React from 'react'
import { getSheetColumns, getSheetData } from './googleData'
import {ReactTable} from './BTable'

import {
  EditableCell,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  fuzzyTextFilterFn
} from './Fitlers'

import {
  PositionColumnFilter
} from './CustomFilters'


class PlayerTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sheetName: 'Players',
      columns: [],
      data: [],
      interval: 10000,
      columnFilters: {
        Name: DefaultColumnFilter,
        Positions: PositionColumnFilter, 
        Team: SelectColumnFilter
      },
      options: {
        excludedColumns: ['Link']
      }
    }
  }

  getColumns() {
    getSheetColumns(this.state.sheetName, this.state.columnFilters, this.state.options).then((columns)=>{
      if (!equalObjects(this.state.columns, columns)){
        this.setState({ columns: columns })
      }
    })
  }

  getData() {
    getSheetData(this.state.sheetName).then((data)=>{
      // check if data has been updated
      if (!equalObjects(this.state.data, data)){
        this.setState({ data: data })
      }
    })
  }

  update() {
    this.getColumns()
    this.getData()
  }

  componentDidMount() {
    this.getColumns()
    this.timer = setInterval(() => { this.update() }, this.state.interval)
  }

  componentWillUnmount() {
      clearInterval(this.timer);
  }


  render() {
    return (
        <ReactTable 
          columns={this.state.columns} 
          data={this.state.data}
          updateMyData={this.update()}
          skipReset={true}
          setPageSize={50}
        />
    )
  }
}

function equalObjects(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}

export default PlayerTable
