import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { calcPercentagesInTheProgressBar } from "../utils";
import { useVars } from "./useVars";

const HabitsContext = createContext();
export const useHabits = () => useContext(HabitsContext);

export const HabitsProvider = ({ children }) => {
  const { habitsList, setHabitsList, countdown, setCountdown, timeStop } =
    useVars();

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
      midnight.setHours(timeStop.hours, timeStop.minutes, timeStop.seconds, 0);

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
        handleCheck,
        createHabitsItem,
        deleteHabitsItem,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
