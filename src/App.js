import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import makeData from './makeData'
import {getSheetColumns, getSheetData} from './googleData'

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

function App() {
  /*
  const columns = React.useMemo(
    () => [
      {
        Header: 'Header',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          }
        ],
      },
    ],
    []
  )
  */
/*
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )
*/
  //const data = React.useMemo(() => makeData(20), [])
  
  const columns = React.useMemo( () => [{
    Header: "header",
    columns: [
      {Header: "Owner", accessor: "Owner"},
      {Header: "FullName", accessor: "FullName"},
      {Header: "Email", accessor: "Email"},
    ]
  }], [])
  
  //const columns = React.useMemo(() => getSheetColumns('1I1G0P8QofhKL2f2EWTLeNGMZ3xedoC5j09FcxN2vigM', 'Owners'), [])
  const data = React.useMemo(() => getSheetData('1I1G0P8QofhKL2f2EWTLeNGMZ3xedoC5j09FcxN2vigM', 'Owners'), [])

  return (
    <Styles>
      {console.log(columns)}
      {console.log(data)}
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App
