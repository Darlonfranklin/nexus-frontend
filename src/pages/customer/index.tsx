import {
  BoxContainer,
  ContainerForm,
  Form,
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
  BadgeOutlined,
  VisibilityOutlined,
  ArticleOutlined,
  WcOutlined,
  LocalPhoneOutlined,
  AlternateEmailOutlined,
  EditRoadOutlined,
  EditLocationAltOutlined,
  LocationCityOutlined,
  MapOutlined,
  HomeWorkOutlined,
  NumbersOutlined,
  PublicOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  Paper,
} from "@mui/material";
import client from "../../services/axios";
import { useCustomerService } from "../../services/customer";
import { ICustomer } from "../../models/customer";
import Select from "../../components/Select";

const Customer: React.FC = () => {
  const selectComboSexo = ["NÃO INFORMADO", "MASCULINO", "FEMININO"];
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [sex, setSex] = useState<string>(selectComboSexo[0]);
  const [streetName, setStreetName] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [country, _setCountry] = useState<string>("BRASIL");
  const [cpfIsValid, setCpfIsValid] = useState<boolean>(false);
  const [phoneIsValid, setPhoneIsValid] = useState<boolean>(false);
  const [cpfMessageError, setCpfMessageError] = useState<string>("");
  const [phoneMessageError, setPhoneMessageError] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [emailMessageError, setEmailMessageError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const validationCancel: boolean =
    !name &&
    !cpf &&
    !phone &&
    !email &&
    !cep &&
    !sex &&
    !streetName &&
    !neighborhood &&
    !locality &&
    !uf &&
    !complement &&
    !number;

  const data: ICustomer = {
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

  const validationSave: boolean =
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

  const handleClear = (): void => {
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

  const validating: boolean =
    !emailIsValid || !phoneIsValid || !cpfIsValid || validationSave;

  const searchCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoad(true);
      const CEP = e.target.value;
      const result = await client.get(`https://viacep.com.br/ws/${CEP}/json/`);
      const { cep, logradouro, bairro, localidade, uf } = result.data;
      setCep(cep);
      setStreetName(logradouro.toUpperCase());
      setNeighborhood(bairro.toUpperCase());
      setLocality(localidade.toUpperCase());
      setUf(uf.toUpperCase());
      setLoad(false);
    } catch (e) {
      setLoad(false);
    }
  };

  const { save } = useCustomerService();

  const validSizeCpf = (value: string) => {
    let message: string = "";
    let isValid: boolean = false;

    if (value.length < 14) {
      isValid = false;
      message = "CPF inválido";
    } else {
      isValid = true;
      message = "";
    }

    setCpfMessageError(message);
    setCpfIsValid(isValid);
  };

  const validSizePhone = (value: string) => {
    let message: string = "";
    let isValid: boolean = false;

    if (value.length < 15) {
      isValid = false;
      message = "Telefone inválido";
    } else {
      isValid = true;
      message = "";
    }

    setPhoneIsValid(isValid);
    setPhoneMessageError(message);
  };

  const validEmail = (email: string) => {
    let message: string = "";
    let isValid: boolean = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      isValid = false;
      message = "Endereço de e-mail inválido.";
    }

    setEmailIsValid(isValid);
    setEmailMessageError(message);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    validSizeCpf(rawValue);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedPhone = insertMaskInPhone(rawValue.slice(0, 15));
    setPhone(formattedPhone);
    validSizePhone(rawValue);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.toUpperCase();
    setEmail(rawValue);
    validEmail(rawValue);
  };
  return (
    <ContainerForm maxWidth="xl">
      <BoxContainer component={Paper}>
        <Title>CADASTRAR CLIENTE</Title>
        <Form component="form" onSubmit={handleSubmit} onReset={handleClear}>
          <GridContainer container spacing={1}>
            <GridContent item xs={12} sm={4}>
              <Input
                autoFocus
                size="small"
                label="Nome*"
                name="name"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value.toUpperCase())
                }
                value={name}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={2}>
              <Input
                size="small"
                label="CPF*"
                name="cpf"
                type="text"
                onChange={handleCpfChange}
                value={cpf}
                fullWidth
                helperText={cpfMessageError}
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArticleOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={3}>
              <Select
                size="small"
                label="Sexo*"
                name="sex"
                type="text"
                value={sex}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSex(e.target.value)
                }
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <WcOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              >
                {selectComboSexo.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </GridContent>

            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="Telefone*"
                name="phone"
                type="text"
                value={phone}
                helperText={phoneMessageError}
                onChange={handlePhoneChange}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12}>
              <Input
                size="small"
                label="E-mail*"
                name="email"
                type="text"
                onChange={handleEmail}
                value={email}
                helperText={emailMessageError}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="CEP*"
                name="cep"
                type="text"
                value={cep}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                  searchCep(e)
                }
                onChange={(event: any) => handleCepChange(event)}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      {load ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Search fontSize={"small"} />
                      )}
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
                label="Rua*"
                name="streetName"
                type="text"
                value={streetName}
                fullWidth
                disabled={true}
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditRoadOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="Bairro*"
                name="neighborhood"
                type="text"
                value={neighborhood}
                disabled={true}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditLocationAltOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="Cidade*"
                name="locality"
                type="text"
                value={locality}
                disabled={true}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={2}>
              <Input
                size="small"
                label="UF*"
                name="uf"
                type="text"
                value={uf}
                disabled={true}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="Complemento*"
                name="complement"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComplement(e.target.value.toUpperCase())
                }
                value={complement}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeWorkOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={2}>
              <Input
                size="small"
                label="Numero*"
                name="number"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumber(e.target.value)
                }
                value={number}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <GridContent item xs={12} sm={2}>
              <Input
                size="small"
                label="País*"
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>

            <Button
              disabled={validating}
              color="primary"
              variant="contained"
              type="submit"
              startIcon={<CheckOutlined />}
            >
              Salvar
            </Button>
            <Button
              color="error"
              type="reset"
              disabled={validationCancel}
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
        </Form>
      </BoxContainer>
    </ContainerForm>
  );
};

export default Customer;
