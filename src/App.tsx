import { useEffect, useState } from "react";
import { despesa } from "./api/types";
import { api, getDespesasEndpoint } from "./api/backend";
import { ListaDespesas } from "./components/ListaDespesas";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { helperFormatMoneyToLocaleBR } from "./helpers/numberHelpers";
import { formatMonth } from "./helpers/dataHelpers";
import { LoginForm } from "./components/LoginForm";

function App() {
  const [despesas, setDespesas] = useState<despesa[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [years, setYears] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("http://localhost:3001/sessao/usuario");

        if (response.statusText === "OK") {
          setHasSession(true);
        }
      } catch (error) {
        console.log("Usuario não está logado!");
        setHasSession(false);
      }
    }

    fetchData();
  }, []);

  // if (!hasSession) {
  //   return;
  // }

  useEffect(() => {
    async function fetchData() {
      const response = await getDespesasEndpoint(
        `http://localhost:3001/despesas?_sort=mes,dia`
      );
      if (response?.statusText === "OK") {
        const { data } = response;

        const anos = data.map((item: despesa) => item.mes.split("-")[0]);
        const uniqueAnos = anos.filter(
          (item: string, index: number, self: string) =>
            index === self.indexOf(item)
        );

        setYears(uniqueAnos);
      }
    }

    if (hasSession) {
      fetchData();
    }
  }, [hasSession]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDespesasEndpoint(
        `http://localhost:3001/despesas?_sort=mes,dia`
      );
      if (response?.statusText === "OK") {
        const { data } = response;
        const meses = data
          .filter((item: despesa) => item.mes.includes(selectedYear))
          .map((item: despesa) => item.mes.split("-")[1]);

        const uniqueMeses = meses
          .filter(
            (item: string, index: number, self: string) =>
              index === self.indexOf(item)
          )
          .sort((a: string, b: string) => a.localeCompare(b));

        setMonths(uniqueMeses);
      }
    }

    if (hasSession) {
      fetchData();
    }
  }, [selectedYear, hasSession]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDespesasEndpoint(
        `http://localhost:3001/despesas?mes=${selectedYear}-${selectedMonth}`
      );
      if (response?.statusText === "OK") {
        const { data } = response;
        const newDespesas = data;

        setDespesas(newDespesas);
      }
    }
    if (hasSession) {
      fetchData();
    }
  }, [selectedYear, selectedMonth, hasSession]);

  function yearHandleChange(event: SelectChangeEvent) {
    setSelectedMonth("");
    const newYear = event.target.value;
    setSelectedYear(newYear);
  }

  function monthHandleChange(event: SelectChangeEvent) {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
  }

  const Page = (
    <>
      <Box
        sx={{
          minWidth: 120,
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
          paddingX: "5%",
        }}
      >
        <Box>
          <h1>Teste</h1>
        </Box>
        <Box>
          <FormControl sx={{ minWidth: 120, marginRight: 5 }}>
            <InputLabel id="year">Ano</InputLabel>
            <Select
              labelId="year"
              id="year"
              value={selectedYear}
              label="Ano"
              onChange={yearHandleChange}
            >
              {years.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="month">Mês</InputLabel>
            <Select
              labelId="month"
              id="month"
              value={selectedMonth}
              label="Mes"
              onChange={monthHandleChange}
              disabled={!selectedYear}
            >
              {months.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {formatMonth(item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {selectedYear && selectedMonth && (
          <span>
            Despesa Total:{" "}
            <strong>
              {helperFormatMoneyToLocaleBR(totalDasDespesas(despesas))}
            </strong>
          </span>
        )}
      </Box>

      <ListaDespesas despesas={despesas} />
    </>
  );

  if (hasSession) {
    return Page;
  } else {
    return <LoginForm />;
  }
}

function totalDasDespesas(despesas: despesa[]) {
  const total = despesas.reduce(
    (prev: number, currentDespesa: despesa) => prev + currentDespesa.valor,
    0
  );

  return total;
}

export default App;
