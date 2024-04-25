import * as React from "react";
import { Container, Title } from "./styles";
import TableList from "../../components/Table";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import client from "../../services/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "../../components/Search";

const List: React.FC = () => {
  const columns = [
    { field: "name", headerName: "Nome", width: 1000 },
    { field: "cpf", headerName: "CPF", width: 400 },
    { field: "sex", headerName: "Sexo", width: 400 },
    { field: "email", headerName: "E-mail", width: 400 },
    { field: "cep", headerName: "CEP", width: 400 },
    { field: "streetName", headerName: "Rua", width: 600 },
    { field: "neighborhood", headerName: "Bairro", width: 400 },
    { field: "locality", headerName: "Cidade", width: 400 },
    { field: "uf", headerName: "UF", width: 400 },
    { field: "complement", headerName: "Comp", width: 250 },
    { field: "number", headerName: "Numero", width: 200 },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: () => {
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        />;
      },
    },
  ];
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any>([]);

  const [filteredRows, setFilteredRows] = useState([]);
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e: any) => {
    const text = e.target.value.toUpperCase();
    setFilterText(text);

    const filteredData = customers.filter((row: any) =>
      Object.values(row).some((value) =>
        String(value).toUpperCase().includes(text)
      )
    );
    setFilteredRows(filteredData);
  };

  const getCustomers = async () => {
    try {
      const response = await client.get("/clients");
      setCustomers(response.data);
    } catch (err: any) {
      toast.error("Erro ao carregar clientes!" + err.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Container style={{ maxWidth: "300vh" }}>
      <Title>
        <ArrowBack
          onClick={() => navigate("/cadastros/cliente")}
          color="inherit"
          style={{
            marginRight: 10,
            cursor: "pointer",
            transition: "color 0.3s",
            width: 40,
            height: 30,
            borderRadius: 15,
            backgroundColor: isHovered ? "#CCC" : "inherit",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        Clientes cadastrados
      </Title>
      <Search value={filterText} onChange={handleFilterChange} />
      <TableList
        columns={columns}
        rows={filterText ? filteredRows : customers}
      />
    </Container>
  );
};

export default List;
