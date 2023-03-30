import { useEffect, useState } from "react";
import { despesa } from "./api/types";
import { getDespesasEndpoint } from "./api/backend";

function App() {
  const [despesas, setDespesas] = useState<despesa[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getDespesasEndpoint(
        "http://localhost:3001/despesas"
      );
      if (response?.statusText === "OK") {
        const { data } = response;
        console.log(data);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>teste</h1>
    </>
  );
}

export default App;
