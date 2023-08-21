import { useEffect } from "react";
import { Button, Typography } from "antd";
import { supabase } from "../../supabase/client";
import CreateGame from "./components/CreateGame/CreateGame";
import CreateTopic from "./components/CreateTopic/CreateTopic";
import ListTopics from "./components/ListTopics/ListTopics";

const Admin = () => {
  useEffect(() => {
    supabase.auth.getUser()
      .then(user => {
        console.log(user);
      });
  }, []);
  return (
    <div>
      <Typography.Title>Crear juego</Typography.Title>
      <CreateGame />
      <hr />
      <Typography.Title level={2}>Crear categorias</Typography.Title>
      <CreateTopic />
      <hr />
      <Typography.Title level={2}>Tus categorias</Typography.Title>
      <ListTopics />
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
};

export default Admin;
