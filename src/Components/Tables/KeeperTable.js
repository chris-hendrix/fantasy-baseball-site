import React from 'react'
import {getDataAndColumns} from './TableData'
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
  DraftedColumnFilter,
  PositionColumnFilter,
  RoundColumnFilter
} from './CustomFilters'


class KeeperTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sheetName: 'Keepers',
      columns: [],
      data: [],
      interval: 0,
      columnFilters: {
        Name: DefaultColumnFilter,
        Pos: PositionColumnFilter, 
        Team: SelectColumnFilter,
        Owner: SelectColumnFilter,
      },
      options: {
        links: [{Name: 'Link'}],
        lastColumn: 'RdMx'
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
          initialPageSize={50}
          showPages={false}
        />
    )
  }
}

function equalObjects(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}

export default KeeperTable
