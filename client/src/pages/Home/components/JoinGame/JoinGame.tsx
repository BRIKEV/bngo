import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinGame: React.FC = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <Label className="mb-2" htmlFor="gameName">Game name</Label>
        <Input id="gameName" name="gameName" required placeholder="Enter game name" />
      </div>

      <div className="mb-4">
        <Label className="mb-2" htmlFor="key">Game password</Label>
        <Input id="key" name="key" required type="password" placeholder="Enter game password" />
      </div>

      <div className="mb-4">
        <Label className="mb-2" htmlFor="username">Your username</Label>
        <Input id="username" name="username" required maxLength={40} placeholder="Enter your username" />
      </div>

      <Button type="submit" className="w-full">
        Acceder a partida
      </Button>

      <Button variant="outline" className="w-full mt-2" asChild>
        <Link to="/admin" className="block">
          Crear una partida
        </Link>
      </Button>
    </form>
  );
};

export default JoinGame;
