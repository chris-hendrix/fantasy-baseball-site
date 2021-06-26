import React from 'react'

function DraftedColumnFilter({column: { filterValue, setFilter, preFilteredRows, id },}) 
{
  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        console.log(filterValue)
        console.log(e.target.value)
        const filterValue2 = e.target.value=="All" ? undefined : ""
        console.log(filterValue2)
        setFilter(filterValue2)
      }}
    >
      <option value="All">All</option>
      <option value="">Drafted</option>
    </select>
  )
}

function PositionColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    return ['C', '1B', '2B', '3B', 'SS', 'OF', "DH", 'SP', 'RP']
  })

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        console.log(e.target.value)
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function RoundColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const rounds = []
    for (var i=1; i<24; i++){
      var round = '0' + i + ':'
      if (i >= 10){ round = i + ':'}
      rounds.push(round)
    }
    return rounds
  })

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export {
  DraftedColumnFilter,
  PositionColumnFilter,
  RoundColumnFilter
}

