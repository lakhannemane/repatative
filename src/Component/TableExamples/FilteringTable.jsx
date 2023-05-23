import React, { useMemo } from "react";
import { useGlobalFilter, useTable, useFilters } from "react-table";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.css";
import GlobalFilter from "./GlobalFilter";
const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    { columns: columns, data: data },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    rows,
    headerGroups,
    prepareRow,

    // filter
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headergroup) => (
            <tr {...headergroup.getHeaderGroupProps()}>
              {headergroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
    </>
  );
};

export default FilteringTable;
