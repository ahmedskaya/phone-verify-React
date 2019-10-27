import React from "react";
import { Table, TableRow } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

const ResTable = ({ rows = [] }) => {
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {Object.keys(rows[0]).map(key => (
            <TableCell
              className="text-capitalize"
              style={{
                whiteSpace: "nowrap"
              }}
              key={key}
            >
              {key.replace(/_/g, " ")}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((i, index) => (
          <TableRow key={index + "row_hisoty"}>
            {Object.keys(i).map(key => (
              <TableCell
                style={{
                  whiteSpace: "nowrap"
                }}
                key={key}
              >
                {typeof i[key] === "boolean"
                  ? i[key]
                    ? "✅"
                    : "❌"
                  : i[key] || "----"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResTable;
