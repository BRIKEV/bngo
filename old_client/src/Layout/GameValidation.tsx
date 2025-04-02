import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { hasAccess } from "../persistence/access.js";

interface Props {
  children: ReactNode;
}

const GameValidation = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAccess()) {
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default GameValidation;
