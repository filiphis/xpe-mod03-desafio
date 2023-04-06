import React, { useEffect, useState } from "react";
import { despesa, UserType } from "./api/types";
import { api, getDespesasEndpoint } from "./api/backend";
import { ListaDespesasDetalhes } from "./components/ListaDespesasDetalhes";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { helperFormatMoneyToLocaleBR } from "./helpers/numberHelpers";
import { formatMonth } from "./helpers/dataHelpers";
import { LoginForm } from "./components/LoginForm";
import Button from "@mui/material/Button";
import { ListaDespesasResumo } from "./components/ListaDespesasResumo";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tabValue: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, tabValue, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabValue === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [despesas, setDespesas] = useState<despesa[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [years, setYears] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [user, setUser] = useState<UserType | null>(null);

  const [tabValue, setTabValue] = React.useState(0);

  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("http://localhost:3001/sessao/usuario");

        if (response.statusText === "OK") {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      }
    }

    fetchData();
  }, []);

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

    if (user) {
      fetchData();
    }
  }, [user]);

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

    if (user) {
      fetchData();
    }
  }, [selectedYear, user]);

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
    if (user) {
      fetchData();
    }
  }, [selectedYear, selectedMonth, user]);

  function yearHandleChange(event: SelectChangeEvent) {
    setSelectedMonth("");
    const newYear = event.target.value;
    setSelectedYear(newYear);
  }

  function monthHandleChange(event: SelectChangeEvent) {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
  }

  async function handleLogOut() {
    try {
      await api.post("http://localhost:3001/sessao/finalizar");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const Page = (
    <>
      <Box
        sx={{
          marginTop: 8,
          paddingX: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Despesas</h1>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Olá {user?.nome}</span>
          <Button variant="outlined" onClick={handleLogOut}>
            Sair
          </Button>
        </Box>
      </Box>
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

      <Box sx={{ minWidth: 650, maxWidth: "90%", margin: "0 auto" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={tabHandleChange}
            aria-label="Tabs para selecionar as despesas"
            centered
          >
            <Tab label="Resumo" {...a11yProps(0)} />
            <Tab label="Detalhes" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel tabValue={tabValue} index={0}>
          <ListaDespesasResumo despesas={despesas} />
        </TabPanel>
        <TabPanel tabValue={tabValue} index={1}>
          <ListaDespesasDetalhes despesas={despesas} />
        </TabPanel>
      </Box>
    </>
  );

  if (user) {
    return Page;
  } else {
    return <LoginForm onLogIn={(user) => setUser(user)} />;
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
