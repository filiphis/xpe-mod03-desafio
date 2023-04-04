import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { despesa } from "../../api/types";
import { Box } from "@mui/system";

// const rows = [
//   createData(1, "Frozen yoghurt", "159", "6.0", 24),
//   createData(2, "Ice cream sandwich", "237", "9.0", 37),
//   createData(3, "Eclair", "262", "16.0", 24),
//   createData(4, "Cupcake", "305", "3.7", 67),
//   createData(5, "Gingerbread", "356", "16.0", 49),
// ];

type ListaDespesasProps = {
  despesas: despesa[];
};

console.log();
function ListaDespesas({ despesas }: ListaDespesasProps) {
  return (
    <Box
      sx={{
        minWidth: 650,
        borderColor: "grey.900",
        display: "flex",
        justifyContent: "center",
        marginY: 10,
        boxShadow: 3,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 650,
          maxWidth: "90%",
        }}
      >
        {console.log("despesas", despesas)}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Despesa</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="left">Dia</TableCell>
              <TableCell align="center">Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas
              .sort((a: despesa, b: despesa) => a.dia.localeCompare(b.dia))
              .map((despesa) => (
                <TableRow
                  hover
                  key={despesa.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{despesa.descricao}</TableCell>
                  <TableCell align="left">{despesa.categoria}</TableCell>
                  <TableCell align="left">{despesa.dia}</TableCell>
                  <TableCell align="center">{despesa.valor}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { ListaDespesas };
