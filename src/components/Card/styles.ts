import styled from "styled-components";
import { Card, CardContent as CardC, Typography, Grid } from "@mui/material";

interface ICardProps {
  color_card?: string;
}

export const CardContent = styled(Grid)``;

export const CardTitle = styled(Typography)``;

export const CardTitleCount = styled(Typography)``;

export const CardCContent = styled(CardC)`
  margin-right: 30px;
`;

export const CardContainer = styled(Grid)`
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export const Cards = styled(Card)<ICardProps>`
  display: flex;
  height: 200px;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.color_card ? props.color_card : "transparent"} !important;
`;

export const CardIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #fff;
  opacity: 0.3;
`;
