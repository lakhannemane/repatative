import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.css";
const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({ columns: columns, data: data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    rows,
    headerGroups,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headergroup) => (
            <tr {...headergroup.getHeaderGroupProps()}>
              {headergroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "⏬" : "⏫") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => {
                return (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default BasicTable;
