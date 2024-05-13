import Input from "../../components/Input";
import LoginIcon from "@mui/icons-material/Login";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyIcon from "@mui/icons-material/Key";
import {
  BoxContainer,
  Button,
  Container,
  Copyright,
  Form,
  GridContent,
  ImageLogo,
  Logo,
} from "./styles";
import { CircularProgress, InputAdornment, Paper } from "@mui/material";
import { useAuth } from "../../contexts/auth";
import { Fragment, useState } from "react";

const LoginPage: React.FC = () => {
  const { signIn, loading } = useAuth();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    await signIn(username, password);
  };

  return (
    <Fragment>
      <Container maxWidth="xs">
        <BoxContainer component={Paper}>
          <Logo>
            <ImageLogo src="/nexus.png" />
          </Logo>
          <Form component="form" onSubmit={handleSubmit}>
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
              color="primary"
              type="submit"
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
          </Form>
        </BoxContainer>
      </Container>
      <Copyright>
        <p>
          &copy; 2024. Todos os direitos reservados. Darlon Franklin Rodrigues.
        </p>
      </Copyright>
    </Fragment>
  );
};

export default LoginPage;
