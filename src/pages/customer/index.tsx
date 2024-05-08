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

import { InputAdornment, MenuItem, Paper } from "@mui/material";
import client from "../../services/axios";
import { useCustomerService } from "../../services/customer";
import Modal from "../../components/Dialog";

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
  const [country, _setCountry] = useState<string>("BRASIL");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const selectComboSexo = ["NÃO INFORMADO", "MASCULINO", "FEMININO"];

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const validationCancel =
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

  let validationSave: boolean =
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
    handleClose();
  };

  const navigate = useNavigate();

  const checkCEP = async (e: any) => {
    const numberCep = e.target.value;

    try {
      const result = await client.get(
        `https://viacep.com.br/ws/${numberCep}/json/`
      );
      const { cep, logradouro, bairro, localidade, uf } = result.data;
      setCep(cep);
      setStreetName(logradouro.toUpperCase());
      setNeighborhood(bairro.toUpperCase());
      setLocality(localidade.toUpperCase());
      setUf(uf.toUpperCase());
    } catch (error: any) {
      console.error(error);
    }
  };

  const { save } = useCustomerService();

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
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedPhone = insertMaskInPhone(rawValue.slice(0, 15));
    setPhone(formattedPhone);
  };

  return (
    <ContainerForm maxWidth="xl">
      <BoxContainer component={Paper}>
        <Title>CADASTRAR CLIENTE</Title>
        <Form
          component="form"
          onSubmit={handleSubmit}
          onReset={handleClickOpen}
        >
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
              <Input
                select
                size="small"
                label="Sexo*"
                name="sexo"
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
              </Input>
            </GridContent>

            <GridContent item xs={12} sm={3}>
              <Input
                size="small"
                label="Telefone*"
                name="phone"
                type="text"
                value={phone}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value.toUpperCase())
                }
                value={email}
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
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => checkCEP(e)}
                onChange={(event: any) => handleCepChange(event)}
                InputProps={{
                  style: { fontSize: "0.9rem", borderRadius: "1px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize={"small"} />
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
              disabled={validationSave}
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
      <Modal
        text={"Deseja realmente cancelar a operação ?"}
        open={openModal}
        handleClose={handleClear}
        cancel={handleClose}
      />
    </ContainerForm>
  );
};

export default Customer;
