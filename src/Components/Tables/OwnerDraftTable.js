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
  PositionColumnFilter,
  RoundColumnFilter
} from './CustomFilters'


class OwnerDraftTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sheetName: 'OwnerDraft',
      columns: [],
      data: [],
      interval: 0,
      columnFilters: {
      },
      options: {
        links: [],
        addedColumns: []
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
    if(this.interval>=1000){
      this.timer = setInterval(() => { this.update() }, this.state.interval)
    }
  }

  componentWillUnmount() {
    if(this.interval>=1000){
      clearInterval(this.timer);
    }
  }


  render() {
    return (
        <ReactTable 
          columns={this.state.columns} 
          data={this.state.data}
          updateMyData={this.update()}
          skipReset={true}
          showPages={false}
          initialPageSize={10}
          hiddenColumns={this.state.hiddenColumns}
        />
    )
  }
}

function equalObjects(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}

export default OwnerDraftTable
