import React, { createContext, useContext, useReducer, useState } from "react";
import { v4 } from "uuid";

const VarsContext = createContext();
export const useVars = () => useContext(VarsContext);

export const VarsProvider = ({ children }) => {
  const [habitsList, setHabitsList] = useState(
    JSON.parse(localStorage.getItem("day6-habit-tracker")) || [
      {
        id: v4(),
        title: "title",
        description: "",
        allDays: 30,
        currentDays: 2,
        progressBarPercent: 0,
        check: true,
        openInfo: false,
      },
    ]
  );

  const [newHabitItem, setNewHabitItem] = useState({
    title: "",
    description: "",
    allDays: 30,
    progressBarPercent: 0,
    check: true,
    openInfo: false,
  });

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeStop = { hours: 24, minutes: 0, seconds: 0 };

  const [openCreateHabitsItemBubble, setOpenCreateHabitsItemBubble] =
    useReducer((open) => !open, false);

  const [openEditHabitsItemBubble, setOpenEditHabitsItemBubble] = useReducer(
    (open) => !open,
    false
  );

  if (openCreateHabitsItemBubble) {
    document.body.classList.add("lock");
  } else {
    document.body.classList.remove("lock");
  }

  const [grid, setGrid] = useReducer((g) => !g, true);

  return (
    <VarsContext.Provider
      value={{
        habitsList,
        setHabitsList,
        newHabitItem,
        setNewHabitItem,
        countdown,
        setCountdown,
        timeStop,
        grid,
        setGrid,
        openCreateHabitsItemBubble,
        setOpenCreateHabitsItemBubble,
        openEditHabitsItemBubble,
        setOpenEditHabitsItemBubble,
      }}
    >
      {children}
    </VarsContext.Provider>
  );
};
