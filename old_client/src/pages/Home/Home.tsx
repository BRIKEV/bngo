import { Card, Image, Typography } from 'antd';
import JoinGame from './components/JoinGame/JoinGame';
import styles from './Home.module.scss';
import logo from '../../assets/BnGO_logo.svg';

const { Title } = Typography;

const Homepage = () => {
  return (
    <div className={styles.container}>
      <Image src={logo} preview={false} />
      <Typography>
        <Title level={3}>Bngo app is a fun application to play picture bingo with your friends</Title>
      </Typography>
      <Card>
        <JoinGame />
      </Card>
    </div>
  );
};

export default Homepage;
