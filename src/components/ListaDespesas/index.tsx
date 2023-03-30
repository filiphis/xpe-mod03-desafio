import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  id: number,
  descricao: string,
  categoria: string,
  dia: string,
  valor: number
) {
  return { id, descricao, categoria, dia, valor };
}

const rows = [
  createData(1, "Frozen yoghurt", "159", "6.0", 24),
  createData(2, "Ice cream sandwich", "237", "9.0", 37),
  createData(3, "Eclair", "262", "16.0", 24),
  createData(4, "Cupcake", "305", "3.7", 67),
  createData(5, "Gingerbread", "356", "16.0", 49),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.descricao}
              </TableCell>
              <TableCell align="right">{row.descricao}</TableCell>
              <TableCell align="right">{row.categoria}</TableCell>
              <TableCell align="right">{row.dia}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
