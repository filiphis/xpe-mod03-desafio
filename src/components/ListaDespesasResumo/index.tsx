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
import { helperFormatNumberToLocaleBR } from "../../helpers/numberHelpers";

type ListaDespesasResumoProps = {
  despesas: despesa[];
};

function filtraCategorias(despesas: despesa[]) {
  const categorias = despesas.map((despesa: despesa) => despesa.categoria);

  const categoriasFiltradas = categorias
    .filter(
      (categoria: string, index: number, self: string[]) =>
        index === self.indexOf(categoria)
    )
    .sort((a, b) => a.localeCompare(b));

  return categoriasFiltradas;
}

function ListaDespesasResumo({ despesas }: ListaDespesasResumoProps) {
  const categoriasFiltradas = filtraCategorias(despesas);

  return (
    <Box
      sx={{
        width: "100%",
        borderColor: "grey.900",
        display: "flex",
        justifyContent: "center",
        marginY: 10,
        padding: 0,
        boxShadow: 3,
      }}
      m={0}
      p={0}
    >
      <TableContainer
        component={Paper}
        sx={{
          minWidth: 650,
          width: "100%",
          padding: 0,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="right">Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriasFiltradas.map((categoriaFiltrada) => (
              <TableRow
                hover
                key={categoriaFiltrada}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{categoriaFiltrada}</TableCell>
                <TableCell align="right">
                  {helperFormatNumberToLocaleBR(
                    despesas
                      .filter(
                        (despesa) => despesa.categoria === categoriaFiltrada
                      )
                      .reduce((prev, current) => prev + current.valor, 0)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { ListaDespesasResumo };
