import { Box, Container as ContainerUi, Grid } from "@mui/material";
import styled from "styled-components";
import { ButtonUI } from "../../components/Button/styles";

export const BoxContainer = styled(Box)`
  padding: 40px;
  justify-content: center;
  align-items: center;
  width: 100%; 
  margin-top: 150px;
`;

export const GridContainer = styled(Grid)``;

export const Container = styled(ContainerUi)`
  height: 100vh; 
`;

export const Title = styled.h3`
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    color: gray;
`;

export const GridContent = styled(Grid)`
    margin-bottom: 30px !important;
`;

export const ImageLogo = styled.img`
    margin-bottom: 30px;

    width: 65%;
`;

export const Logo = styled.div`
     width: 100%;
  height: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(ButtonUI)`
  margin-left: 1px !important;
`;
