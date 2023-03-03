import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const HabitsContext = createContext();
export const useHabits = () => useContext(HabitsContext);

export const HabitsProvider = ({ children }) => {
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
      {
        id: v4(),
        title: "title",
        description: "",
        allDays: 30,
        currentDays: 16,
        progressBarPercent: 0,
        check: false,
      },
      {
        id: v4(),
        title: "title",
        description: "",
        allDays: 30,
        currentDays: 5,
        progressBarPercent: 0,
        check: false,
      },
      {
        id: v4(),
        title: "title",
        description: "",
        allDays: 30,
        currentDays: 0,
        progressBarPercent: 0,
        check: false,
      },
    ]
  );
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeStop = { hours: 23, minutes: 59, seconds: 59 };

  useEffect(() => {
    localStorage.setItem("day6-habit-tracker", JSON.stringify(habitsList));
  }, [habitsList]);

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

  function calcPercentagesInTheProgressBar(allDays, currentDays) {
    return Math.floor((100 / allDays) * currentDays);
  }

  const handleCheck = (id) => {
    setHabitsList(
      habitsList.map((item) =>
        item.id === id
          ? {
              ...item,
              check: !item.check,
              currentDays:
                item.check === true
                  ? (item.currentDays -= 1)
                  : (item.currentDays += 1),
              progressBarPercent: calcPercentagesInTheProgressBar(
                item.allDays,
                item.currentDays
              ),
            }
          : item
      )
    );
  };

  const createHabitsItem = () => {
    setHabitsList([
      ...habitsList,
      {
        id: v4(),
        title: "title",
        description: "",
        allDays: 30,
        currentDays: 0,
        progressBarPercent: 0,
        check: false,
      },
    ]);
  };

  const deleteHabitsItem = (id) => {
    setHabitsList(habitsList.filter((item) => item.id !== id));
  };

  function remind() {
    setHabitsList(
      habitsList.map((item) =>
        item.check === true
          ? {
              ...item,
              check: false,
              currentDays: item.currentDays,
              progressBarPercent: calcPercentagesInTheProgressBar(
                item.allDays,
                item.currentDays
              ),
            }
          : {
              ...item,
              progressBarPercent: calcPercentagesInTheProgressBar(
                item.allDays,
                item.currentDays
              ),
            }
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Отримуємо поточний час
      const now = new Date();

      // Встановлюємо час на опівночі
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      // Обчислюємо залишок часу
      const remainingTime = midnight.getTime() - now.getTime();
      const remainingSeconds = Math.floor(remainingTime / 1000);
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);

      // Оновлюємо стан компонента
      setCountdown({
        hours: remainingHours,
        minutes: remainingMinutes % 60,
        seconds: remainingSeconds % 60,
      });

      if (
        now.getHours() === timeStop.hours &&
        now.getMinutes() === timeStop.minutes &&
        now.getSeconds() === timeStop.seconds
      ) {
        // Викликаємо функцію нагадування
        remind();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [habitsList]);

  return (
    <HabitsContext.Provider
      value={{
        countdown,
        habitsList,
        setHabitsList,
        handleCheck,
        createHabitsItem,
        deleteHabitsItem,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
