import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, RowsLength } from "./styles";
import { useNavigate } from "react-router-dom";
import Modal from "../Dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "@mui/material";
import { useCustomerService } from "../../services/customer";
import { SearchOffOutlined } from "@mui/icons-material";
import { ChangeEvent, MouseEvent, useState } from "react";
import TablePaginationActions from "../TablePagination";

interface IColumn {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "right" | "center" | any;
}

interface IRow {
  [key: string]: any;
}

interface ITableProps {
  columns: IColumn[];
  rows: IRow[];
  rowsPerPageOptions?: any[];
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onClick?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TableList: React.FC<ITableProps> = ({
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25, { label: "All", value: -1 }],
  onPageChange,
  onRowsPerPageChange,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [customerId, setCustomerId] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { deleteId } = useCustomerService();

  const handleClickOpen = (id: string) => {
    setCustomerId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(event, newPage);
    }
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onRowsPerPageChange &&
      onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const onEditButtonClick = (rowData: any) => {
    if (rowData) {
      navigate(`/cadastros/cliente/editar/${rowData.id}`);
    }
  };

  const onViewButtonClick = (rowData: any) => {
    if (rowData) {
      navigate(`/cadastros/cliente/informações/${rowData.id}`);
    }
  };

  const onDeleteButtonClick = (customerId: string) => {
    if (customerId) {
      deleteId(customerId);
      window.location.reload();
      handleClose();
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || "center"}
                style={{ width: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#f2f2f2" : "white",
              }}
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align={column.align || "left"}
                  style={{ width: column.width, fontSize: 11.5 }}
                >
                  {column.field === "actions" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Tooltip title="Editar">
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => onEditButtonClick(row)}
                        >
                          <ModeEditOutlineIcon color="inherit" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Mais Informações">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => onViewButtonClick(row)}
                        >
                          <VisibilityIcon color="inherit" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(row.id)}
                        >
                          <DeleteOutlineIcon color="inherit" />
                        </Button>
                      </Tooltip>
                    </div>
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {!rows?.length ? (
            <RowsLength>
              Nenhum cliente encontrado
              <SearchOffOutlined style={{ marginLeft: 8 }} />
            </RowsLength>
          ) : null}
        </TableBody>
        <Modal
          text={"Deseja realmente exluir o registro ?"}
          handleClose={() => onDeleteButtonClick(customerId)}
          open={openModal}
          cancel={handleClose}
        />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={columns.length}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableList;
