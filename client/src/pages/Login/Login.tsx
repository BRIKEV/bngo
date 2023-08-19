import React from 'react';
import { supabase } from '../../supabase/client';

const Login = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
    };
    const email = target.email.value;
    console.log(email);
    try {
      const result = await supabase.auth.signInWithOtp({
        email,
      });
      console.log(result);
    } catch (error) {
      console.error(error); 
    }
  };
  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    console.log(data, error);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="emai" name="email" />
        <button type="submit">Login</button>
      </form>
      <button onClick={signInWithGitHub}>Github</button>
    </div>
  );
};

export default Login;
