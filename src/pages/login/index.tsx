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
import { CancelOutlined } from "@mui/icons-material";
import { InputAdornment, Paper } from "@mui/material";

const LoginPage: React.FC = () => {
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
            name="country"
            type="text"
            value={undefined}
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
            name="phone"
            type="password"
            fullWidth
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
            value={undefined}
          />
        </GridContent>
        <Button color="primary" variant="contained" startIcon={<LoginIcon />}>
          Acessar
        </Button>
        <Button
          color="error"
          variant="contained"
          startIcon={<CancelOutlined />}
        >
          Cancelar
        </Button>
      </BoxContainer>
    </Container>
  );
};

export default LoginPage;
