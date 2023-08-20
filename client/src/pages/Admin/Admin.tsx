import { useEffect } from "react";
import { Button } from "antd";
import { supabase } from "../../supabase/client";
import CreateGame from "./components/CreateGame/CreateGame";
import CreateTopic from "./components/CreateTopic/CreateTopic";

const Admin = () => {
  useEffect(() => {
    supabase.auth.getUser()
      .then(user => {
        console.log(user);
      });
  }, []);
  return (
    <div>
      <h1>Crear juego</h1>
      <CreateGame />
      <CreateTopic />
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
};

export default Admin;
