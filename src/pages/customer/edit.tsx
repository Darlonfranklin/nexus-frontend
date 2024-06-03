import {
  BoxContainer,
  ContainerEdit,
  Form,
  GridContainer,
  GridContent,
  Title,
} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { insertMaskInCEP } from "../../functions/cep";
import { insertMaskInCpf } from "../../functions/cpf";
import { insertMaskInPhone } from "../../functions/phone";
import {
  CheckOutlined,
  Search,
  AddCircleOutline,
  BadgeOutlined,
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
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

import { InputAdornment, MenuItem, Paper } from "@mui/material";
import { useCustomerService } from "../../services/customer";
import { ICustomer } from "../../models/customer";
import { AxiosResponse } from "axios";
import Select from "../../components/Select";
import api from "../../services/axios";

const CustomerEdit: React.FC = () => {
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

  const { id } = useParams();

  const selectComboSexo = ["NÃO INFORMADO", "MASCULINO", "FEMININO"];

  const data = {
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

  const validation: boolean =
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

  const navigate = useNavigate();

  const checkCEP = async (e: ChangeEvent<HTMLInputElement>) => {
    const ceep = e.target.value;

    try {
      const result = await api.get(`https://viacep.com.br/ws/${ceep}/json/`);
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

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response: AxiosResponse = await api.get(`/clients/${id}`);
        setClientData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const setClientData = (customer: ICustomer) => {
    setName(customer.name.toUpperCase());
    setCpf(customer.cpf);
    setSex(customer.sex);
    setPhone(customer.phone);
    setEmail(customer.email.toUpperCase());
    setCep(customer.cep);
    setStreetName(customer.streetName.toUpperCase());
    setNeighborhood(customer.neighborhood.toUpperCase());
    setLocality(customer.locality.toUpperCase());
    setUf(customer.uf.toUpperCase());
    setComplement(customer.complement.toUpperCase());
    setNumber(customer.number.toUpperCase());
  };

  const { update } = useCustomerService();

  const handleUpdate = async (
    event: ChangeEvent<HTMLInputElement>,
    id: string | undefined,
    data: ICustomer
  ) => {
    event.preventDefault();
    const customerId: string = id ?? "";
    await update(customerId, data);
  };

  const handleCepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, "");
    const formattedCep = insertMaskInCEP(rawValue.slice(0, 8));
    setCep(formattedCep);
  };

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedCpf = insertMaskInCpf(rawValue.slice(0, 14));
    setCpf(formattedCpf);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedPhone = insertMaskInPhone(rawValue.slice(0, 15));
    setPhone(formattedPhone);
  };

  return (
    <ContainerEdit maxWidth="xl">
      <BoxContainer component={Paper}>
        <Title>
          <EditIcon fontSize="medium" style={{ marginRight: 10 }} />
          EDITAR CLIENTE
        </Title>
        <Form
          component="form"
          onSubmit={(event: ChangeEvent<HTMLInputElement>) =>
            handleUpdate(event, id, data)
          }
        >
          <GridContainer container spacing={1}>
            <GridContent item xs={12} sm={4}>
              <Input
                autoFocus
                size="small"
                label="Nome*"
                name="name"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value.toUpperCase())
                }
                value={name}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                name="sexo"
                type="text"
                value={sex}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSex(e.target.value)
                }
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                onChange={handlePhoneChange}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value.toUpperCase())
                }
                value={email}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                onBlur={(e: ChangeEvent<HTMLInputElement>) => checkCEP(e)}
                onChange={(event: any) => handleCepChange(event)}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setComplement(e.target.value.toUpperCase())
                }
                value={complement}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNumber(e.target.value)
                }
                value={number}
                fullWidth
                InputLabelProps={{
                  style: { fontSize: "0.9rem" },
                }}
                InputProps={{
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
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
                  style: {
                    fontSize: "0.9rem",
                    borderRadius: "1px",
                    backgroundColor: id ? "#f3ffb9" : "",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicOutlined fontSize={"small"} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridContent>
            <Button
              disabled={validation}
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<CheckOutlined />}
            >
              Alterar
            </Button>

            <Button
              color="success"
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={() => navigate("/cadastros/cliente")}
            >
              Novo
            </Button>
          </GridContainer>
        </Form>
      </BoxContainer>
    </ContainerEdit>
  );
};

export default CustomerEdit;
