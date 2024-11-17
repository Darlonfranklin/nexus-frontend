type Column = {
  field: string;
  headerName: string;
  width: number;
  align: "left" | "center" | "right"; 
};

export const getColumns = (): Column[] => [
  { field: "name", headerName: "Nome", width: 300, align: "left" },
  { field: "cpf", headerName: "CPF", width: 400, align: "center" },
  { field: "email", headerName: "E-mail", width: 400, align: "center" },
  { field: "cep", headerName: "CEP", width: 400, align: "center" },
  { field: "actions", headerName: "Ações", width: 10, align: "center" },
];
