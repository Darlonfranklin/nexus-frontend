import Input from "../../components/Input";
import LoginIcon from "@mui/icons-material/Login";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyIcon from "@mui/icons-material/Key";
import {
  BoxContainer,
  Button,
  Container,
  GridContent,
  ImageLogo,
  Logo,
} from "./styles";
import { CircularProgress, InputAdornment, Paper } from "@mui/material";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const { signIn, loading } = useAuth();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Container maxWidth="xs">
      <BoxContainer component={Paper}>
        <Logo>
          <ImageLogo src="/nexus.png" />
        </Logo>

        <GridContent>
          <Input
            size="small"
            label="Usuário do sistema"
            name="user"
            type="text"
            value={username}
            onChange={(e: any) => setUserName(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "0.9rem" },
            }}
            InputProps={{
              style: { fontSize: "0.9rem", borderRadius: "1px" },
              startAdornment: (
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridContent>

        <GridContent>
          <Input
            size="small"
            label="Senha"
            name="password"
            type="password"
            fullWidth
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "0.9rem" },
            }}
            InputProps={{
              style: { fontSize: "0.9rem", borderRadius: "1px" },
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridContent>
        <Button
          onClick={() => signIn(username, password)}
          color="primary"
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LoginIcon />
            )
          }
        >
          Acessar
        </Button>
      </BoxContainer>
    </Container>
  );
};

export default LoginPage;
