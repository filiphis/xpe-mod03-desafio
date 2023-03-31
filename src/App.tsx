import { useEffect, useState } from "react";
import { despesa } from "./api/types";
import { getDespesasEndpoint } from "./api/backend";
import { ListaDespesas } from "./components/ListaDespesas";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function App() {
  const [despesas, setDespesas] = useState<despesa[]>([]);
  const [year, setYear] = useState("2020");
  const [month, setMonth] = useState("06");

  useEffect(() => {
    async function fetchData() {
      // const ano = "2021";
      const mes = "06";
      const response = await getDespesasEndpoint(
        `http://localhost:3001/despesas?mes=${year}-${month}`
      );
      // `http://localhost:3001/despesas?mes=${year}-${mes}&_sort=mes,dia`
      if (response?.statusText === "OK") {
        const { data } = response;
        const newDespesas = data;
        setDespesas(newDespesas);
      }
    }

    fetchData();
  }, [year, month]);

  function yearHandleChange(event: SelectChangeEvent) {
    const newYear = event.target.value;
    setYear(newYear);
  }

  function monthHandleChange(event: SelectChangeEvent) {
    const newMonth = event.target.value;
    setMonth(newMonth);
  }
  console.log(year);

  return (
    <>
      <Box
        sx={{
          minWidth: 120,
          marginTop: 8,
          display: "flex",
          justifyContent: "start",
          gap: 5,
          paddingLeft: "5%",
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="year">Ano</InputLabel>
          <Select
            labelId="year"
            id="year"
            value={year}
            label="Ano"
            onChange={yearHandleChange}
          >
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
          </Select>
          {year}
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="month">Mês</InputLabel>
          <Select
            labelId="month"
            id="month"
            value={month}
            label="Mes"
            onChange={monthHandleChange}
          >
            <MenuItem value={"06"}>06</MenuItem>
            <MenuItem value={"11"}>11</MenuItem>
          </Select>
          {month}
        </FormControl>
      </Box>

      <ListaDespesas despesas={despesas} />
    </>
  );
}

export default App;
