import React from 'react'
// @ts-expect-error TS(2307): Cannot find module 'react-table' or its correspond... Remove this comment to see the full error message
import { useTable, useBlockLayout, useFlexLayout } from 'react-table'
// @ts-expect-error TS(2307): Cannot find module 'react-window' or its correspon... Remove this comment to see the full error message
import { FixedSizeList } from 'react-window'
import './DataTable.scss'

export default function DataTable({
  columns,
  data
}: any) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 200,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
    // useFlexLayout
  )

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <tr
          {...row.getRowProps({
            style,
          })}
          className="datatable-row"
        >
          {row.cells.map((cell: any) => {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <td {...cell.getCellProps()} className="datatable-cell">
                {cell.render('Cell')}
              </td>
            )
          })}
        </tr>
      );
    },
    [prepareRow, rows]
  )

  // Render the UI for your table
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="datatable-container">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <table {...getTableProps()} className="datatable">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <thead>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          {headerGroups.map((headerGroup: any) => <tr {...headerGroup.getHeaderGroupProps()} className="tr">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {headerGroup.headers.map((column: any) => <th
              {...column.getHeaderProps()}
              className="datatable-header-cell"
            >
              {column.render('Header')}
            </th>)}
          </tr>)}
        </thead>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <tbody {...getTableBodyProps()}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <FixedSizeList
            height={400}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth}
          >
            {RenderRow}
          </FixedSizeList>
        </tbody>
      </table>
    </div>
  );
}
