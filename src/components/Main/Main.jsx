import React from "react";
import { Container } from "../Container";
import { HabitList } from "./Habits/HabitList";

export const Main = () => {
  return (
    <main className="mt-[90px] flex-grow flex-shrink basis-auto">
      <Container>
        <div className="">
          <HabitList />
        </div>
      </Container>
    </main>
  );
};
