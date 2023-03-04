import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useHabits } from "../../../hooks/useHabits";

export const HabitItem = ({
  id,
  title,
  description,
  allDays,
  currentDays,
  progressBarPercent,
  check,
}) => {
  const { handleCheck, deleteHabitsItem } = useHabits();

  return (
    <div className="relative min-h-[200px] max-w-[200px] bg-sandy-brown text-blue-dianne p-[30px] pt-[20px] rounded-[15px] shadow-lg">
      <h3 className="mb-[20px] pr-[25px] text-[20px] text-ellipsis overflow-hidden w-full whitespace-nowrap">
        {title}
      </h3>
      {/* progress bar */}
      <CircularProgressbar
        value={progressBarPercent}
        text={`${currentDays}/${allDays}`}
      />
      <button
        className={`absolute top-[20px] right-[20px] w-[30px] h-[30px] border-[4px] border-solid rounded-[50%] transition duration-3'00 flex items-center justify-center ${
          check ? "bg-blue-dianne" : ""
        }`}
        onClick={() => handleCheck(id)}
      >
        {check && <FaCheck className="text-sandy-brown" />}
      </button>
      <button
        className="absolute bottom-[20px] right-[20px] transition duration-300 hover:scale-110 active:scale-90"
        onClick={() => deleteHabitsItem(id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};
