import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 } from "uuid";
import { calcPercentagesInTheProgressBar } from "../utils";
import { useVars } from "./useVars";

const HabitsContext = createContext();
export const useHabits = () => useContext(HabitsContext);

export const HabitsProvider = ({ children }) => {
  const {
    habitsList,
    newHabitItem,
    setNewHabitItem,
    setHabitsList,
    setCountdown,
    timeStop,
    openCreateHabitsItemBubble,
    setOpenCreateHabitsItemBubble,
    setOpenEditHabitsItemBubble,
  } = useVars();

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

  const createHabitsItem = (e) => {
    e.preventDefault();

    setHabitsList(
      newHabitItem.title !== ""
        ? [
            ...habitsList,
            {
              id: v4(),
              title: newHabitItem.title,
              description: newHabitItem.description,
              allDays: newHabitItem.allDays,
              currentDays: 0,
              progressBarPercent: newHabitItem.progressBarPercent,
              check: false,
            },
          ]
        : [
            ...habitsList,
            {
              id: v4(),
              title: "Title",
              description: newHabitItem.description,
              allDays: newHabitItem.allDays,
              currentDays: 0,
              progressBarPercent: newHabitItem.progressBarPercent,
              check: false,
            },
          ]
    );

    setNewHabitItem({
      title: "",
      description: "",
      allDays: 30,
      progressBarPercent: 0,
      check: true,
    });

    setOpenCreateHabitsItemBubble();
  };

  const deleteHabitsItem = (id) => {
    setHabitsList(habitsList.filter((item) => item.id !== id));
  };

  function funkOpenEditHabitsItemBubble(id) {
    habitsList.map((item) =>
      item.id === id
        ? setNewHabitItem({
            ...item,
            id: item.id,
            title: item.title,
            description: item.description,
            allDays: item.allDays,
            currentDays: item.currentDays,
            progressBarPercent: item.progressBarPercent,
          })
        : newHabitItem
    );
  }

  const editHabitsItem = (e) => {
    e.preventDefault();
    console.log(newHabitItem);

    setHabitsList(
      habitsList.map((item) =>
        item.id === newHabitItem.id
          ? newHabitItem.title !== ""
            ? {
                ...item,
                title: newHabitItem.title,
                description: newHabitItem.description,
                allDays: newHabitItem.allDays,
                currentDays: newHabitItem.currentDays,
                progressBarPercent: newHabitItem.progressBarPercent,
              }
            : {
                ...item,
                title: "Title",
                description: newHabitItem.description,
                allDays: newHabitItem.allDays,
                currentDays: newHabitItem.currentDays,
                progressBarPercent: newHabitItem.progressBarPercent,
              }
          : item
      )
    );

    setNewHabitItem({
      title: "",
      description: "",
      allDays: 30,
      progressBarPercent: 0,
      check: true,
    });

    setOpenEditHabitsItemBubble();
  };

  // функція викличеться коли таймер дійде до кінця. функція знімає у всіх елементів check, та фіксує currentDays
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

  // таймер
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
        editHabitsItem,
        openCreateHabitsItemBubble,
        setOpenCreateHabitsItemBubble,
        funkOpenEditHabitsItemBubble,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
