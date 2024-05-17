import styled from "styled-components";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const ContainerModal = styled(Dialog)``;

export const TitleModal = styled(DialogTitle)`
  display: flex;
  align-items: center;
  background-color: #0089ba;
  color: #fff;
`;

export const ContentModal = styled(DialogContent)`
  margin-top: 35px;
`;

export const TextModal = styled(DialogContentText)`
  font-size: 20px !important;
`;

export const ActionsModal = styled(DialogActions)``;

export const Attention = styled(ReportProblemIcon)`
   color: #FFFF00;
   margin-left: 5px;
           
`;
