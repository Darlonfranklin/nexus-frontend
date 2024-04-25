import styled from "styled-components";
import Toolbar from "@mui/material/Toolbar";

interface IImg {
  open?: boolean;
}

export const MyToolBar = styled(Toolbar)``;

export const Title = styled.h4`
  flex-grow: 1;
  font-family: "Poppins", sans-serif;
`;

export const Logo = styled.div`
  width: 100%;
  height: 9%;
`;

export const ImageP = styled.img<IImg>`
  height: ${(props) => (props.open ? "0px" : "90px")};
  width: ${(props) => (props.open ? "0px" : "250px")};
  margin-left: 16px;
`;

export const ImageL = styled.img<IImg>`
  height: ${(props) => (props.open ? null : "40px")};
  width: ${(props) => (props.open ? null : "35px")};
  margin-top: ${(props) => (props.open ? null : "16px")};
  margin-left: ${(props) => (props.open ? null : "15px")};
`;

export const TitleVersion = styled.h5`
  font-family: "Poppins", sans-serif;
`;
