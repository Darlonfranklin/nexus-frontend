import {
  CardContainer,
  CardCContent,
  Cards,
  CardContent,
  CardTitle,
  CardIcon,
  CardTitleCount,
} from "./styles";

interface ICardItem {
  title: string;
  count: number;
  color_card?: string;
  icon?: JSX.Element;
}

interface ICard {
  data: ICardItem[];
  color: string;
}

const GenericCard: React.FC<ICard> = ({ data, color }) => {
  return (
    <CardContainer container spacing={4}>
      {data.map((item: ICardItem, index: number) => (
        <CardContent item xs={10} sm={8} md={3.5} key={index}>
          <Cards color_card={item.color_card} key={index} elevation={2}>
            <CardIcon>{item.icon}</CardIcon>
            <CardCContent>
              <CardTitleCount variant="h1" color={color}>{item.count}</CardTitleCount>
              <CardTitle variant="h6" color={color}>{item.title}</CardTitle>
            </CardCContent>
          </Cards>
        </CardContent>
      ))}
    </CardContainer>
  );
};

export default GenericCard;
