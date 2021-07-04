import React from 'react'
import { getDataAndColumns } from './googleData'
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

  update() {
    getDataAndColumns(this.state.sheetName, this.state.columnFilters, this.state.options).then((obj)=>{
      // check if data has been updated
      if (!equalObjects(this.state.data, obj.data)){
        this.setState({ data: obj.data, columns: obj.columns })
      }
    })
  }

  componentDidMount() {
    this.update()
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
