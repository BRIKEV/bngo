import { Button, Image, Modal, Typography } from 'antd';
import gamesStore from '../../store/game';
import { logout } from '../../../../persistence/access';
import trophy from '../../../../assets/trophy_nobg.png';

const WinnerModal = () => {
  const winner = gamesStore(state => state.winner);
  const leaveGame = () => {
    logout();
    window.location.reload();
  };
  return (
    <Modal
      closable={false}
      open={!!winner}
      footer={(
        <Button block type="primary" onClick={leaveGame}>Salir</Button>
      )}
    >
      <Typography.Title level={2}>Ganador {winner}</Typography.Title>
      <Image preview={false} src={trophy} />
    </Modal>
  );
};


export default WinnerModal;
