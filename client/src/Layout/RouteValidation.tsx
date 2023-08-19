import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { supabase } from '../supabase/client.js'

interface Props {
  children: ReactNode;
}

const RouteValidation = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        navigate('/');
      }
      
    });
  }, [navigate]);

  return <>{children}</>;
};

export default RouteValidation;
