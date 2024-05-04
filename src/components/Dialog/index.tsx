import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

interface IModal {
  open: boolean;
  handleClose: () => void;
  cancel: () => void;
}

const Modal: React.FC<IModal> = ({ open, handleClose, cancel }) => {
  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#0089BA",
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          {"Atenção"}
          <ReportProblemIcon
            fontSize={"inherit"}
            style={{ color: "#FFFF00", marginLeft: "5px" }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente sair do sistema ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
          <Button onClick={cancel}>CANCELAR</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
