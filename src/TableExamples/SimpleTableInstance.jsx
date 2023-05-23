import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.css";
const SimpleTableInstance = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({ columns: columns, data: data });

  const {
    getTableProps,
    getTableBodyProps,
    rows,

    headerGroups,
    prepareRow,
  } = tableInstance;

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
          {rows.slice(0, 10).map((row) => {
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
    </>
  );
};

export default SimpleTableInstance;
