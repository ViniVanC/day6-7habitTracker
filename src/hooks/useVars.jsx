import React, { createContext, useContext, useState } from "react";
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
      },
    ]
  );
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeStop = { hours: 24, minutes: 0, seconds: 0 };

  return (
    <VarsContext.Provider
      value={{
        habitsList,
        setHabitsList,
        countdown,
        setCountdown,
        timeStop,
      }}
    >
      {children}
    </VarsContext.Provider>
  );
};