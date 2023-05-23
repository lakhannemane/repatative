import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.css";
const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable(
    { columns: columns, data: data },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,

    page,
    previousPage,
    nextPage,
    headerGroups,
    prepareRow,
    canNextPage,
    state,
    setPageSize,
    pageOptions,
    canPreviousPage,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
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
          {page.map((row) => {
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
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions?.length}
          </strong>{" "}
        </span>

        <select
          name="selct pagesize"
          id="page size"
          defaultValue={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 15, 20].map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
