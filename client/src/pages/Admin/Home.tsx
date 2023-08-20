import { supabase } from "../../supabase/client";

const Admin = () => {
  return (
    <div>
      AdminPage
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>
  );
};

export default Admin;
