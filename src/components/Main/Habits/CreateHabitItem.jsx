import React from "react";
import { useHabits } from "../../../hooks/useHabits";
import { useVars } from "../../../hooks/useVars";
import { HiXMark } from "react-icons/hi2";

export const CreateHabitItem = () => {
  const { createHabitsItem } = useHabits();
  const { newHabitItem, setNewHabitItem, setOpenCreateHabitsItemBubble } =
    useVars();
  return (
    <>
      <form
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] max-w-[524px] w-full flex flex-col  bg-blue-dianne p-[30px] rounded-[15px] shadow-lg"
        onSubmit={createHabitsItem}
      >
        <button
          className="absolute top-[5px] right-[5px] text-[30px] transition duration-300 hover:scale-110 active:scale-90"
          onClick={setOpenCreateHabitsItemBubble}
        >
          <HiXMark />
        </button>
        <input
          className="w-full bg-transparent text-[30px] font-bold mb-[10px] text-burnt-sienna placeholder:text-burnt-sienna"
          type="text"
          placeholder="Title"
          value={newHabitItem.title}
          onChange={(e) =>
            setNewHabitItem({ ...newHabitItem, title: e.target.value })
          }
        />
        <textarea
          className="w-full bg-transparent text-burnt-sienna placeholder:text-burnt-sienna resize-none"
          cols="50"
          rows="10"
          placeholder="Description..."
          value={newHabitItem.description}
          onChange={(e) =>
            setNewHabitItem({ ...newHabitItem, description: e.target.value })
          }
        />
        <div className="mb-[20px] text-right">
          <label className="font-semibold">{newHabitItem.allDays}</label>
          <input
            type="range"
            min={7}
            max={90}
            step={1}
            value={newHabitItem.allDays}
            onChange={(e) =>
              setNewHabitItem({ ...newHabitItem, allDays: e.target.value })
            }
          />
        </div>
        <button className="p-[10px] text-blue-dianne bg-burnt-sienna font-bold rounded-[10px] transition duration-300 hover:scale-105 active:scale-90">
          Add
        </button>
      </form>
      <div
        className="absolute top-0 left-0 z-[59] bg-black/30 w-[100vw] h-[100vh] backdrop-blur-md"
        onClick={setOpenCreateHabitsItemBubble}
      />
    </>
  );
};
