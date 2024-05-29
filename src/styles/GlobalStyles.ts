import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background-color:  #fff;  
        }   

        ::-webkit-scrollbar-thumb {
            background-color: #c6c6c6; 
        }
    }   

    html, body, #root {
        height: 100%;
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }
`;
