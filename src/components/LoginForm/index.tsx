import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { api } from "../../api/backend";
import { UserType } from "../../api/types";

type LoginFormProps = {
  onLogIn: (user: UserType) => void;
};

function LoginForm({ onLogIn }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [hasError, setHasError] = useState("");

  async function handleSubmitLoginForm(event: FormEvent) {
    event.preventDefault();

    const URL = "http://localhost:3001/sessao/criar";

    const data = {
      email,
      senha,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await api.post(URL, data, config);
      const user = response.data;

      onLogIn(user);
      console.log("Login realizado com sucesso!");
    } catch (error) {
      const axiosErr = error as AxiosError;
      console.error(axiosErr.response?.data);
      setHasError("Email ou senha estão incorretos!");
    }
  }

  const errorStyle = {
    backgroundColor: "rgba(233, 194, 190, 0.918)",
    borderRadius: "4px",
    padding: "16px",
  };

  return (
    <form onSubmit={handleSubmitLoginForm}>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            width: "50%",
          }}
        >
          <h1>Digite seus dados para acessar </h1>
          <TextField
            autoComplete="true"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {hasError && <Container sx={errorStyle}>{hasError}</Container>}

          <Box sx={{ width: "100%", textAlign: "right" }}>
            <Button
              sx={{
                width: "30%",
                padding: "16px 26px",
                display: "inline-block",
              }}
              variant="contained"
              type="submit"
            >
              Logar
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}

export { LoginForm };
