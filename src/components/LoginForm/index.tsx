import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <div>
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
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email}
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {senha}

          <Box sx={{ width: "100%", textAlign: "right" }}>
            <Button
              sx={{
                width: "30%",
                padding: "16px 26px",
                display: "inline-block",
              }}
              variant="contained"
            >
              Logar
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export { LoginForm };
