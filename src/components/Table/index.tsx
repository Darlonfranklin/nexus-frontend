import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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

interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "right" | "center" | any;
}

interface Row {
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  rows: Row[];
  rowsPerPageOptions?: any[];
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onClick?: any;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TableList: React.FC<TableProps> = ({
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25, { label: "All", value: -1 }],
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [customerId, setCustomerId] = React.useState<string>("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { deleteId } = useCustomerService();

  const handleClickOpen = (id: string) => {
    setCustomerId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
    onPageChange && onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          {rows === undefined || rows.length === 0 ? (
            <RowsLength>
              Nenhum cliente encontrado
              <SearchOffOutlined style={{ marginLeft: 8 }} />
            </RowsLength>
          ) : (
            true
          )}
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
