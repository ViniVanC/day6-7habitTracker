import React from "react";
import { useVars } from "../../../hooks/useVars";
import { HabitItem } from "./HabitItem";

export const HabitList = () => {
  const { habitsList, grid } = useVars();

  return (
    <ul
      className={`flex max-[768px]:justify-center gap-[20px] flex-wrap ${
        grid ? "" : "flex-col"
      }`}
    >
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
