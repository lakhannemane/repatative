import React from "react";

const ColumnFilter = ({ column }) => {
  let { filterValue, setFilter } = column;
  return (
    <span>
      Serach :{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
    </span>
  );
};

export default ColumnFilter;
