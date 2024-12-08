import { Fragment } from "react/jsx-runtime";
import GenericCard from "../../components/Card";
import { Person, CurrencyExchange, CreditScore } from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const cardData = [
    { title: "Em breve", count: 10, color_card: "#019b64", icon: <Person  style={{ fontSize: '180px' }} /> }, 
    { title: "Em breve", count: 20, color_card: "#0089BA", icon: <CurrencyExchange style={{ fontSize: '180px' }}  /> }, 
    { title: "Em breve", count: 30, color_card: "#D32F2F", icon: <CreditScore style={{ fontSize: '180px' }} /> }, 
  ];

  return (
    <Fragment>
      <GenericCard data={cardData} color="#fff"  />
    </Fragment>
  );
};

export default Dashboard;
