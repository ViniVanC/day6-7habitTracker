import React, { useEffect, useState } from "react";
import { useHabits } from "../../hooks/useHabits";

export const Timer = () => {
  const { countdown } = useHabits();
  return (
    <div className="text-[20px] font-bold">
      {countdown.hours}:{countdown.minutes}:{countdown.seconds}
    </div>
  );
};
