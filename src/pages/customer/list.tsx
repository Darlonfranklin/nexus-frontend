import * as React from "react";
import { ContainerList, Title } from "./styles";
import TableList from "../../components/Table";
import { useNavigate } from "react-router-dom";
import client from "../../services/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "../../components/Search";
import { AxiosResponse } from "axios";
import Button from "../../components/Button";
import { ArrowBack } from "@mui/icons-material";

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

  const [customers, setCustomers] = useState<[]>([]);

  const [filteredRows, setFilteredRows] = useState<any>([]);
  const [filterText, setFilterText] = useState<string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toUpperCase();
    setFilterText(text);

    const filteredData = customers.filter((row: []) =>
      Object.values(row).some((value) =>
        String(value).toUpperCase().includes(text)
      )
    );
    setFilteredRows(filteredData);
  };

  const getCustomers = async () => {
    try {
      const response: AxiosResponse = await client.get("/clients");
      setCustomers(response.data);
    } catch (err: any) {
      toast.error("Erro ao carregar clientes!" + err.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <ContainerList>
      <Title>CLIENTES CADASTRADOS </Title>
      <Search value={filterText} onChange={handleFilterChange} />
      <TableList
        columns={columns}
        onClick={() => navigate("/cadastros/cliente/editar")}
        rows={filterText ? filteredRows : customers}
      />

      <Button
        onClick={() => navigate("/cadastros/cliente")}
        color="inherit"
        variant="text"
        startIcon={<ArrowBack />}
      >
        Voltar
      </Button>
    </ContainerList>
  );
};

export default List;
