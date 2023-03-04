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

  // якщо habitsList змінився, оновлюємо запис у localStorage
  useEffect(() => {
    localStorage.setItem("day6-habit-tracker", JSON.stringify(habitsList));
  }, [habitsList]);

  // при кожному перезавантаженні сторінки підраховуємо кількість відсотків у progressBar, у кожному елементі
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

  // функція змінює статус check на протилежний, якщо було натиснуто на відповідну кнопку. додає, чи віднімає один день у currentDays, в залежності від статусу check. оновлює progressBar.
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

  // функція для створення нового завдання.
  const createHabitsItem = (e) => {
    e.preventDefault();

    // формуємо та додаємо новий елемент
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

    // занулюємо об'єкт newHabitItem
    setNewHabitItem({
      title: "",
      description: "",
      allDays: 30,
      progressBarPercent: 0,
      check: true,
    });

    // закриваємо форму
    setOpenCreateHabitsItemBubble();
  };

  // функція для видалення елемента
  const deleteHabitsItem = (id) => {
    setHabitsList(habitsList.filter((item) => item.id !== id));
  };

  // функція потрібна для редагування даних елемента, вона отримує всі елементи з масиву habitsList, знаходить потрібний за id, бере з нього данні(id, title, description, allDays, currentDays, progressBarPercent) та поміщає їх у об'єкт newHabitItem.
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

  // функція спрацює після кліку на кнопку add у формі редагування
  const editHabitsItem = (e) => {
    e.preventDefault();

    // змінюємо старі данні на нові
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

    // занулюємо об'єкт newHabitItem
    setNewHabitItem({
      title: "",
      description: "",
      allDays: 30,
      progressBarPercent: 0,
      check: true,
    });

    // закриваємо форму
    setOpenEditHabitsItemBubble();
  };

  // відкиває вікно з повною інформацією
  function openFullInfo(id) {
    setHabitsList(
      habitsList.map((item) =>
        item.id === id ? { ...item, openInfo: !item.openInfo } : item
      )
    );
  }

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
        openFullInfo,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
