import React, { useMemo } from "react";
import { useRowSelect, useTable } from "react-table";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.css";
import { Checkbox } from "./CheckBox";
const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    { columns: columns, data: data },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    selectedFlatRows,

    headerGroups,
    prepareRow,
  } = tableInstance;

  let FirstTenRecords = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headergroup) => (
            <tr {...headergroup.getHeaderGroupProps()}>
              {headergroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {FirstTenRecords.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <pre>
        <code>
          {selectedFlatRows?.length}
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default RowSelection;
