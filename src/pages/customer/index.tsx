import {
  BoxContainer,
  Container,
  GridContainer,
  GridContent,
  Title,
} from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { insertMaskInCEP } from "../../functions/cep";
import { insertMaskInCpf } from "../../functions/cpf";
import { insertMaskInPhone } from "../../functions/phone";
import {
  CancelOutlined,
  CheckOutlined,
  Search,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { InputAdornment, MenuItem } from "@mui/material";
import client from "../../services/axios";
import { useCustomerService } from "../../services/customer";

const Customer: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [country, _setCountry] = useState<string>("Brasil");

  let data = {
    name: name,
    cpf: cpf,
    phone: phone,
    email: email,
    cep: cep,
    sex: sex,
    streetName: streetName,
    neighborhood: neighborhood,
    locality: locality,
    uf: uf,
    complement: complement,
    number: number,
    country: country,
  };

  let validation: boolean =
    !name ||
    !cpf ||
    !phone ||
    !email ||
    !cep ||
    !sex ||
    !streetName ||
    !neighborhood ||
    !locality ||
    !uf ||
    !complement ||
    !number;

  const clear = (): void => {
    setName("");
    setCpf("");
    setPhone("");
    setEmail("");
    setCep("");
    setSex("");
    setStreetName("");
    setNeighborhood("");
    setLocality("");
    setUf("");
    setComplement("");
    setNumber("");
  };

  const navigate = useNavigate();

  const checkCEP = async (e: any) => {
    const ceep = e.target.value;

    try {
      const result = await client.get(`https://viacep.com.br/ws/${ceep}/json/`);
      const { cep, logradouro, bairro, localidade, uf } = result.data;
      setCep(cep);
      setStreetName(logradouro);
      setNeighborhood(bairro);
      setLocality(localidade);
      setUf(uf);
    } catch (error: any) {
      console.error(error);
    }
  };

  const { save } = useCustomerService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await save(data);
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, "");
    const formattedCep = insertMaskInCEP(rawValue.slice(0, 8));
    setCep(formattedCep);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedCpf = insertMaskInCpf(rawValue.slice(0, 14));
    setCpf(formattedCpf);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedPhone = insertMaskInPhone(rawValue.slice(0, 15));
    setPhone(formattedPhone);
  };

  return (
    <Container maxWidth="xl">
      <Title>CADASTRO DE CLIENTES</Title>
      <BoxContainer>
        <GridContainer container spacing={1}>
          <GridContent item xs={12} sm={4}>
            <Input
              size="small"
              label="Nome"
              name="name"
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              error={name === ""}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={2}>
            <Input
              size="small"
              label="CPF"
              name="cpf"
              type="text"
              error={cpf === ""}
              onChange={handleCpfChange}
              value={cpf}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={3}>
            <Input
              select
              size="small"
              label="Sexo"
              name="sexo"
              type="text"
              error={sex === ""}
              value={sex}
              onChange={(e: any) => setSex(e.target.value)}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </Input>
          </GridContent>

          <GridContent item xs={12} sm={3}>
            <Input
              size="small"
              label="Telefone"
              name="phone"
              type="text"
              error={phone === ""}
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12}>
            <Input
              size="small"
              label="E-mail"
              name="email"
              type="text"
              error={email === ""}
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={3}>
            <Input
              size="small"
              label="CEP"
              name="cep"
              type="text"
              value={cep}
              error={cep === ""}
              onBlur={(e: any) => checkCEP(e)}
              onChange={(event: any) => handleCepChange(event)}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={6}>
            <Input
              size="small"
              label="Rua"
              name="streetName"
              type="text"
              value={streetName}
              error={streetName === ""}
              fullWidth
              disabled={true}
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={3}>
            <Input
              size="small"
              label="Bairro"
              name="neighborhood"
              type="text"
              value={neighborhood}
              error={neighborhood === ""}
              disabled={true}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={3}>
            <Input
              size="small"
              label="Cidade"
              name="locality"
              type="text"
              value={locality}
              error={locality === ""}
              disabled={true}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={2}>
            <Input
              size="small"
              label="UF"
              name="uf"
              type="text"
              value={uf}
              disabled={true}
              error={uf === ""}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={3}>
            <Input
              size="small"
              label="Complemento"
              name="complement"
              type="text"
              error={complement === ""}
              onChange={(e: any) => setComplement(e.target.value)}
              value={complement}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={2}>
            <Input
              size="small"
              label="Numero"
              name="number"
              type="text"
              onChange={(e: any) => setNumber(e.target.value)}
              value={number}
              error={number === ""}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <GridContent item xs={12} sm={2}>
            <Input
              size="small"
              label="País"
              name="country"
              type="text"
              disabled={true}
              value={country}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "0.9rem" },
              }}
              InputProps={{
                style: { fontSize: "0.9rem", borderRadius: "1px" },
              }}
            />
          </GridContent>
          <Button
            disabled={validation}
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            startIcon={<CheckOutlined />}
          >
            Salvar
          </Button>
          <Button
            onClick={clear}
            color="error"
            variant="contained"
            startIcon={<CancelOutlined />}
          >
            Cancelar
          </Button>
          <Button
            color="success"
            variant="contained"
            startIcon={<VisibilityOutlined />}
            onClick={() => navigate("listar")}
          >
            Vizualizar
          </Button>
        </GridContainer>
      </BoxContainer>
    </Container>
  );
};

export default Customer;
