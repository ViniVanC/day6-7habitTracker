import React, { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const HabitsContext = createContext();
export const useHabits = () => useContext(HabitsContext);

export const HabitsProvider = ({ children }) => {
  const [habitsList, setHabitsList] = useState([
    {
      id: v4(),
      title: "title",
      description: "",
      allDays: 30,
      currentDays: 1,
      check: false,
    },
  ]);

  const handleCheck = (id) => {
    setHabitsList(
      habitsList.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  };

  const deleteHabitsItem = (id) => {};

  return (
    <HabitsContext.Provider
      value={{ habitsList, handleCheck, deleteHabitsItem }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
