import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FaCheck } from "react-icons/fa";
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
  const { handleCheck } = useHabits();

  return (
    <div className="relative min-h-[200px] max-w-[200px]  bg-sandy-brown text-blue-dianne p-[30px] pt-[20px] rounded-[15px] shadow-lg">
      <h3 className="mb-[20px] text-[20px]">{title}</h3>
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
    </div>
  );
};
