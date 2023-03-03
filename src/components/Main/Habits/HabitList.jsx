import React from "react";
import { useHabits } from "../../../hooks/useHabits";
import { HabitItem } from "./HabitItem";

export const HabitList = () => {
  const { habitsList } = useHabits();

  return (
    <ul className="flex items-center gap-[20px] flex-wrap">
      {habitsList.map((item) => (
        <HabitItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          allDays={item.allDays}
          currentDays={item.currentDays}
          progressBarPercent={item.progressBarPercent}
          check={item.check}
        />
      ))}
    </ul>
  );
};
