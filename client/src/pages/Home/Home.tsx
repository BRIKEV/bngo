import { Card, Typography } from "antd";
import JoinGame from "./components/JoinGame/JoinGame";
import styles from './Home.module.css';

const { Title } = Typography;

const Homepage = () => {
  return (
    <div className={styles.container}>
      <Typography>
        <Title>Bngo App</Title>
        <Title level={2}>Bngo app is a fun application to play picture bingo with your friends</Title>
      </Typography>
      <Card>
        <JoinGame />
      </Card>
    </div>
  );
};

export default Homepage;
