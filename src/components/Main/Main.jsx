import React from "react";
import { FaGripHorizontal, FaGripLines, FaPlus } from "react-icons/fa";
import { useHabits } from "../../hooks/useHabits";
import { useVars } from "../../hooks/useVars";
import { Container } from "../Container";
import { CreateHabitItem } from "./Habits/CreateHabitItem";
import { HabitList } from "./Habits/HabitList";

export const Main = () => {
  const {
    openCreateHabitsItemBubble,
    setOpenCreateHabitsItemBubble,
    openEditHabitsItemBubble,
    setOpenEditHabitsItemBubble,
    grid,
    setGrid,
  } = useVars();
  const { createHabitsItem, editHabitsItem } = useHabits();

  return (
    <main className="mt-[90px] mb-[30px] flex-grow flex-shrink basis-auto">
      <Container>
        <div>
          <div className="flex items-center justify-between mb-[20px]">
            <h1 className="text-[30px] font-bold">Habit Tracker</h1>
            <div className="flex items-center gap-[20px]">
              <button className="text-[30px]" onClick={setGrid}>
                {grid ? <FaGripHorizontal /> : <FaGripLines />}
              </button>
              <button
                className="w-[50px] h-[50px] flex items-center justify-center text-[30px] border-[3px] border-solid rounded-[50%] transition duration-300 hover:scale-110 active:scale-90"
                onClick={setOpenCreateHabitsItemBubble}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <hr className="mb-[20px]" />
          <HabitList />
          {openCreateHabitsItemBubble ? (
            <CreateHabitItem
              submit={createHabitsItem}
              close={setOpenCreateHabitsItemBubble}
            />
          ) : (
            ""
          )}
          {openEditHabitsItemBubble ? (
            <CreateHabitItem
              submit={editHabitsItem}
              close={setOpenEditHabitsItemBubble}
            />
          ) : (
            ""
          )}
        </div>
      </Container>
    </main>
  );
};
