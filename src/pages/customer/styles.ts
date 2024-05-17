import { Box, Container as ContainerUi, Grid } from "@mui/material";
import styled from "styled-components";

export const BoxContainer = styled(Box)`
  padding: 50px;
  height: 60vh auto;
`;

export const GridContainer = styled(Grid)``;

export const ContainerList = styled(ContainerUi)`
max-width: 300vh !important;

`;

export const ContainerForm = styled(ContainerUi)``;

export const ContainerEdit = styled(ContainerUi)``;

export const ContainerInformation = styled(ContainerUi)``;

export const Title = styled.h3`
  margin-bottom: 50px;
  align-items: center;
  display: flex;
  color: gray;
`;

export const Details = styled.h3`
  margin-bottom: 35px;
  display: flex;
  color: gray;
`;

export const Data = styled.p`
  margin-bottom: 25px;
  color: gray;
`;
export const Img = styled.img`
  margin-top: 15px;
`;

export const GridContent = styled(Grid)`
  margin-bottom: 30px !important;
`;

export const Form = styled(Box)``;