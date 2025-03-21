import styled from "styled-components";
import Toolbar from "@mui/material/Toolbar";

interface IImg {
  open?: boolean;
}

export const MyToolBar = styled(Toolbar)``;

export const Title = styled.h4`
  flex-grow: 1;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
`;

export const Logo = styled.div`
  width: 100%;
  height: 9%;
`;

export const ImageP = styled.img<IImg>`
  height: ${(props) => (props.open ? "" : "")};
  width: ${(props) => (props.open ? "" : "")};
  margin-left: 16px;
`;

export const ImageL = styled.img<IImg>`
  height: ${(props) => (props.open ? null : "46px")};
  width: ${(props) => (props.open ? null : "35px")};
  margin-top: ${(props) => (props.open ? null : "16px")};
  margin-left: ${(props) => (props.open ? null : "15px")};
`;

export const TitleVersion = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
`;

export const Exit = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #fff;
`;

export const HourView = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
`;


export const DateView = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
`;

export const Separator = styled.p`
  margin-left: 13px;
  margin-right: 13px;
`;

export const Copyright = styled.footer`
    width: 100%; 
    position: fixed; 
    bottom: 0;
    padding: 5px 0; 
    font-size: 11px;

    p {
      margin-left: 10px;
    }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  
  p {
    font-family: "Poppins", sans-serif;
    font-size: 12px;
  }
`;