import { useEffect } from "react";
import { supabase } from "../../supabase/client";

const Homepage = () => {
  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .then(({ data: users, error }) => {
        console.log(error);
        console.log('courses', users);
      })
    supabase
      .from('user_2_course')
      .select('course_id, user_id, users(*), courses(*)')
      .then(({ data: courses, error }) => {
        console.log(error);
        console.log('user_2_course', courses);
      })
  }, []);
  return (
    <div>
      Hola
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>
  );
};

export default Homepage;
