import * as React from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  ActionsModal,
  ContainerModal,
  ContentModal,
  TextModal,
  TitleModal,
} from "./styles";
import Button from "../Button";
import { CancelOutlined, CheckOutlined } from "@mui/icons-material";

interface IModal {
  open: boolean;
  handleClose: () => void;
  cancel: () => void;
  text: string;
}

const Modal: React.FC<IModal> = ({ open, handleClose, cancel, text }) => {
  return (
    <React.Fragment>
      <ContainerModal open={open}>
        <TitleModal>
          {"Atenção"}
          <ReportProblemIcon
            fontSize={"inherit"}
            style={{ color: "#FFFF00", marginLeft: "5px" }}
          />
        </TitleModal>
        <ContentModal>
          <TextModal>{text}</TextModal>
        </ContentModal>

        <ActionsModal>
          <Button
            startIcon={<CheckOutlined />}
            color="info"
            variant="contained"
            onClick={handleClose}
          >
            OK
          </Button>
          <Button
            startIcon={<CancelOutlined />}
            color="warning"
            variant="contained"
            onClick={cancel}
          >
            CANCELAR
          </Button>
        </ActionsModal>
      </ContainerModal>
    </React.Fragment>
  );
};

export default Modal;
