import { Card, Typography } from "antd";
import JoinGame from "./components/JoinGame/JoinGame";
const { Title } = Typography;

const Homepage = () => {
  return (
    <Typography>
      <Title>Bngo App</Title>
      <Title level={2}>Bngo app is a fun application to play picture bingo with your friends</Title>
      <Card>
        <JoinGame />
      </Card>
    </Typography>
  );
};

export default Homepage;
