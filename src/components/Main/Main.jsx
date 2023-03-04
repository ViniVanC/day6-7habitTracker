import React from "react";
import { FaPlus } from "react-icons/fa";
import { useHabits } from "../../hooks/useHabits";
import { Container } from "../Container";
import { CreateHabitItem } from "./Habits/CreateHabitItem";
import { HabitList } from "./Habits/HabitList";

export const Main = () => {
  const {
    createHabitsItem,
    openCreateHabitsItemBubble,
    setOpenCreateHabitsItemBubble,
  } = useHabits();

  return (
    <main className="mt-[90px] flex-grow flex-shrink basis-auto">
      <Container>
        <div className="">
          <div className="flex items-center justify-between mb-[20px]">
            <h1 className="text-[30px] font-bold">Habit Tracker</h1>
            <button
              className="w-[50px] h-[50px] flex items-center justify-center text-[30px] border-[3px] border-solid rounded-[50%] transition duration-300 hover:scale-110 active:scale-90"
              onClick={setOpenCreateHabitsItemBubble}
            >
              <FaPlus />
            </button>
          </div>
          <hr />
          <HabitList />
          {openCreateHabitsItemBubble ? <CreateHabitItem /> : ""}
        </div>
      </Container>
    </main>
  );
};
