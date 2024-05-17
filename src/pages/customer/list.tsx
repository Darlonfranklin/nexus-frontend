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
import { ArrowBack, Reorder } from "@mui/icons-material";
import { getColumns } from "../../columns/customer";

const List: React.FC = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<[]>([]);

  const [filteredRows, setFilteredRows] = useState<any>([]);
  const [filterText, setFilterText] = useState<string>("");

  const columns = getColumns();

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
      <Title>
        <Reorder fontSize="medium" style={{ marginRight: 10 }} />
        CLIENTES CADASTRADOS
      </Title>
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
