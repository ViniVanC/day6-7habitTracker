import React from "react";
import { useVars } from "../../hooks/useVars";

export const Timer = () => {
  const { countdown } = useVars();
  return (
    <div className="text-[20px] font-bold">
      {countdown.hours}:{countdown.minutes}:{countdown.seconds}
    </div>
  );
};
