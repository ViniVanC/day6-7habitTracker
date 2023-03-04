import React from "react";
import { Container } from "../Container";
import { Logo } from "./Logo";
import { Timer } from "./Timer";

export const Header = () => {
  return (
    <header className="fixed z-50 w-[100%] py-[10px] bg-blue-dianne/50 backdrop-blur-md shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <Timer />
        </div>
      </Container>
    </header>
  );
};
