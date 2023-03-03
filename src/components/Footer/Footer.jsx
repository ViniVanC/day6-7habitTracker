import React from "react";
import { Container } from "../Container";

export const Footer = () => {
  return (
    <footer className="py-10px bg-rob-roy text-blue-dianne">
      <Container>
        <div className="flex items-center justify-center">
          <h3 className="subtitle">
            Powered by
            <a
              className="ml-[10px]"
              href="https://github.com/ViniVanC"
              target="_blank"
            >
              Vincent Van
            </a>
          </h3>
        </div>
      </Container>
    </footer>
  );
};
