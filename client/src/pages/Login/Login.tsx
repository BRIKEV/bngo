import { supabase } from '../../supabase/client';
import { Button, Form, Input } from 'antd';

interface FormValues {
  email: string;
}

const Login = () => {
  const handleSubmit = async (values: FormValues) => {
    const email = values.email;
    try {
      const result = await supabase.auth.signInWithOtp({
        email,
      });
      console.log(result);
    } catch (error) {
      console.error(error); 
    }
  };
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item name="email" label="Email" htmlFor="email">
          <Input type="email" id="email" />
        </Form.Item>
        <Button htmlType="submit" type="primary">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
