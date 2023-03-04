import React from "react";

export const ShowFullInfo = ({
  title,
  description,
  allDays,
  currentDays,
  progressBarPercent,
}) => {
  return (
    <div className="absolute top-[20px] left-[20px] flex flex-col gap-[10px] bg-jungle-green/50 text-blue-dianne p-[10px] rounded-[15px] shadow-lg backdrop-blur-md">
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
