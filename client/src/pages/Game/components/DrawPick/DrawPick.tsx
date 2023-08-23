import { List, Typography } from "antd";
import gamesStore from "../../store/game";
import RouletteComponent from "../../../../components/Wheel/Wheel";

const DrawPick = () => {
  const [currentResult, users, board] = gamesStore(state => [
    state.currentResult,
    state.users,
    state.board,
  ]);

  console.log('Re render DrawPick');
  console.log(currentResult);
  return (
    <div>
      <Typography.Title level={3}>DrawPick</Typography.Title>
      <div>
      <Typography.Title level={4}>Se muestra</Typography.Title>
      <div className="container-roulette">
        <RouletteComponent
          animate={false}
          selected={{
            image: 'https://gzmvuryxyfjgmunxfuhf.supabase.co/storage/v1/object/sign/topics/83f433c6-8a9f-4e37-bd0c-9367f32245e9/28/WhatsApp Image 2023-08-11 at 19.58.03.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0b3BpY3MvODNmNDMzYzYtOGE5Zi00ZTM3LWJkMGMtOTM2N2YzMjI0NWU5LzI4L1doYXRzQXBwIEltYWdlIDIwMjMtMDgtMTEgYXQgMTkuNTguMDMuanBlZyIsImlhdCI6MTY5Mjc4NDg4NCwiZXhwIjoxNjkyODA1Njg0fQ.1KTN7vbF2MgHh5zw3OaH5zfSNPJVx00JQRDXo5AjaH8',
            name: 'test'
          }}
          images={board}
        />
      </div>
      {currentResult.selected.image}
      <hr />
      <Typography.Title level={4}>Users</Typography.Title>
        <List>
          {users.map(user => (
            <List.Item key={user.username}>
              <Typography.Text>{user.username}</Typography.Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default DrawPick;
