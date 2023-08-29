import { Button, Modal, Typography } from "antd";
import gamesStore from "../../store/game";
import { logout } from "../../../../persistence/access";

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
    </Modal>
  );
};


export default WinnerModal;
