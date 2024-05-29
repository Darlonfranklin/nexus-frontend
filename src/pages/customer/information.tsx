import { Paper } from "@mui/material";
import {
  BoxContainer,
  ContainerInformation,
  Data,
  Details,
  GridContainer,
  GridContent,
  Img,
  Title,
} from "./styles";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import client from "../../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ICustomer } from "../../models/customer";
import Button from "../../components/Button";
import { Add, ArrowBack, PictureAsPdf } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FeedIcon from "@mui/icons-material/Feed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";

const Information: React.FC = () => {
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
  const [country, setCountry] = useState<string>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response: AxiosResponse = await client.get(`/clients/${id}`);
        setClientData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const generateReport = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await client.get(
        `/clients/relatorio/${id}`,
        {
          responseType: "blob",
        }
      );
      const reportBlob = response.data;
      const reportUrl = window.URL.createObjectURL(reportBlob);
      window.open(reportUrl, "_blank");
      window.URL.revokeObjectURL(reportUrl);
    } catch (error) {
      toast.error("Erro ao gerar relatório, tente novamente!!!");
    }
  };

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
    setCountry(customer.country.toUpperCase());
  };

  return (
    <ContainerInformation>
      <BoxContainer component={Paper}>
        <Title>
          <VisibilityIcon style={{ marginRight: 10 }} /> DETALHES DO CLIENTE
        </Title>
        <GridContainer container>
          <GridContent item xs={30} sm={7}>
            <Details>
              <FeedIcon style={{ marginRight: 10 }} /> INFORMAÇÕES PESSOAIS
            </Details>
            <Data>
              <strong>Nome :</strong> {name}
            </Data>
            <Data>
              <strong>CPF :</strong> {cpf}
            </Data>
            <Data>
              <strong>Telefone :</strong> {phone}
            </Data>
            <Data>
              <strong>Sexo :</strong> {sex}
            </Data>
            <Data>
              <strong>E-mail :</strong> {email}
            </Data>
            <Img src="/nexus.png" />
          </GridContent>
          <GridContent item xs={20} sm={4}>
            <Details>
              <LocationOnIcon style={{ marginRight: 10 }} /> ENDEREÇO
            </Details>
            <Data>
              <strong>CEP :</strong> {cep}
            </Data>
            <Data>
              <strong>Rua :</strong> {streetName}
            </Data>
            <Data>
              <strong>Bairro :</strong> {neighborhood}
            </Data>
            <Data>
              <strong>Cidade :</strong> {locality}
            </Data>
            <Data>
              <strong>UF :</strong> {uf}
            </Data>
            <Data>
              <strong>Complemento :</strong> {complement}
            </Data>
            <Data>
              <strong>Número :</strong> {number}
            </Data>
            <Data>
              <strong>Pais :</strong> {country}
            </Data>
          </GridContent>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/cadastros/cliente/listar")}
          >
            voltar
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<Add />}
            onClick={() => navigate("/cadastros/cliente")}
          >
            Novo Cadastro
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={generateReport}
            startIcon={<PictureAsPdf />}
          >
            PDF
          </Button>
        </GridContainer>
      </BoxContainer>
    </ContainerInformation>
  );
};
export default Information;
