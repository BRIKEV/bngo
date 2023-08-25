import { Modal, Typography } from "antd";
import gamesStore from "../../store/game";

const WinnerModal = () => {
  const winner = gamesStore(state => state.winner);
  return (
    <Modal
      closable
      open={!!winner}
    >
      <Typography.Title level={2}>Ganador {winner}</Typography.Title>
    </Modal>
  );
};


export default WinnerModal;
