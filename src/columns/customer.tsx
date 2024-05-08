export const getColumns = () => [
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
