import {Fragment} from "react";
import {
  ActionsModal,
  Attention,
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
    <Fragment> 
      <ContainerModal open={open}>
        <TitleModal>
          {"Atenção"}
          <Attention />
        </TitleModal>
        <ContentModal>
          <TextModal>{text}</TextModal>
        </ContentModal>

        <ActionsModal>
          <Button
            startIcon={<CheckOutlined />}
            color="primary"
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
    </Fragment>
  );
};

export default Modal;
