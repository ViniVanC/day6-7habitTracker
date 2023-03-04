import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useHabits } from "../../hooks/useHabits";

export const ShowFullInfo = ({
  id,
  title,
  description,
  allDays,
  currentDays,
  progressBarPercent,
}) => {
  const { openFullInfo } = useHabits();

  return (
    <div className="absolute top-[20px] left-1/2 -translate-x-1/2 min-w-[170px] flex flex-col gap-[10px] bg-jungle-green/50 text-blue-dianne p-[10px] rounded-[15px] shadow-lg backdrop-blur-md">
      <button className="absolute top-[-20px] right-[-20px] w-[30px] h-[30px] rounded-[50%] bg-jungle-green flex items-center justify-center text-[20px] ">
        <HiXMark onClick={() => openFullInfo(id)} />
      </button>
      <h2 className="text-[20px] font-bold">{title}</h2>
      <p>{description === "" ? "nothing" : description}</p>
      <hr />
      <p>
        All days: <span className="font-semibold text-[18px]">{allDays}</span>
      </p>
      <p>
        Current days:
        <span className="font-semibold text-[18px]">
          {currentDays}
          <span className="text-[14px]">({progressBarPercent}%)</span>
        </span>
      </p>
    </div>
  );
};
