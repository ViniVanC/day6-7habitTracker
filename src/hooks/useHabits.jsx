import React, { createContext, useContext, useEffect, useState } from "react";
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
      currentDays: 2,
      progressBarPercent: 0,
      check: true,
      timer: true,
    },
    {
      id: v4(),
      title: "title",
      description: "",
      allDays: 30,
      currentDays: 5,
      progressBarPercent: 0,
      check: false,
      timer: true,
    },
    {
      id: v4(),
      title: "title",
      description: "",
      allDays: 30,
      currentDays: 0,
      progressBarPercent: 0,
      check: false,
      timer: true,
    },
  ]);

  useEffect(() => {
    setHabitsList(
      habitsList.map((item) => ({
        ...item,
        progressBarPercent: calcPercentagesInTheProgressBar(
          item.allDays,
          item.currentDays
        ),
      }))
    );
  }, []);

  const calcPercentagesInTheProgressBar = (allDays, currentDays) => {
    return Math.floor((100 / allDays) * currentDays);
  };

  const handleCheck = (id) => {
    setHabitsList(
      habitsList.map((item) =>
        item.id === id
          ? {
              ...item,
              check: !item.check,
              currentDays:
                item.timer === true
                  ? item.check === true
                    ? (item.currentDays -= 1)
                    : (item.currentDays += 1)
                  : item.currentDays,
              progressBarPercent: calcPercentagesInTheProgressBar(
                item.allDays,
                item.currentDays
              ),
            }
          : item
      )
    );
  };

  const deleteHabitsItem = (id) => {};

  return (
    <HabitsContext.Provider
      value={{
        habitsList,
        handleCheck,
        deleteHabitsItem,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
