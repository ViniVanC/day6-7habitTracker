import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useHabits } from "../../../hooks/useHabits";
import { useVars } from "../../../hooks/useVars";

export const HabitItem = ({
  id,
  title,
  description,
  allDays,
  currentDays,
  progressBarPercent,
  check,
}) => {
  const {
    handleCheck,
    deleteHabitsItem,
    editHabitsItem,
    funkOpenEditHabitsItemBubble,
  } = useHabits();
  const { grid, setOpenEditHabitsItemBubble } = useVars();

  return (
    <div
      className={
        grid
          ? "relative min-h-[200px] max-w-[200px] bg-sandy-brown text-blue-dianne p-[30px] pt-[20px] rounded-[15px] shadow-lg"
          : "relative w-[100%] bg-sandy-brown text-blue-dianne p-[30px] pt-[20px] rounded-[15px] shadow-lg"
      }
    >
      <h3 className="mb-[25px] pr-[25px] text-[20px] text-ellipsis overflow-hidden w-full whitespace-nowrap">
        {title}
      </h3>
      {/* progress bar */}
      {grid ? (
        <CircularProgressbar
          value={progressBarPercent}
          text={`${currentDays}/${allDays}`}
        />
      ) : (
        <div className="pr-[30px]">
          <div className=""></div>
          <div className="w-full h-[5px] bg-slate-50 rounded-[20px]">
            <div
              className={`h-full bg-blue-dianne rounded-[20px] transition-all duration-300`}
              style={{ width: `${progressBarPercent}%` }}
            ></div>
          </div>
        </div>
      )}
      <button
        className={`absolute top-[20px] right-[20px] w-[30px] h-[30px] border-[4px] border-solid rounded-[50%] transition duration-3'00 flex items-center justify-center ${
          check ? "bg-blue-dianne" : ""
        }`}
        onClick={() => handleCheck(id)}
      >
        {check && <FaCheck className="text-sandy-brown" />}
      </button>
      <button className="absolute bottom-[25px] right-[25px] text-[20px] transition duration-300 hover:scale-110 active:scale-90">
        <BsThreeDotsVertical />
      </button>
      <div className="absolute bottom-[20px] right-[45px] w-min h-min p-[10px] rounded-[5px] bg-blue-dianne text-sandy-brown flex items-center gap-[15px]">
        <button
          className=" transition duration-300 hover:scale-110 active:scale-90"
          onClick={() => deleteHabitsItem(id)}
        >
          <FaTrash />
        </button>
        <button
          className="transition duration-300 hover:scale-110 active:scale-90"
          onClick={() => {
            setOpenEditHabitsItemBubble();
            funkOpenEditHabitsItemBubble(id);
          }}
        >
          <FaPen />
        </button>
      </div>
    </div>
  );
};
