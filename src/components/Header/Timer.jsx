import React from "react";
import { FaMoon } from "react-icons/fa";
import { useVars } from "../../hooks/useVars";

export const Timer = () => {
  const { countdown } = useVars();
  return (
    <div className="flex items-center gap-[10px] text-[20px] font-bold">
      {/* отримаємо об'єкт countdown, беремо з нього години, хвилини та секунди, показуємо їх */}
      <FaMoon /> {countdown.hours}:{countdown.minutes}:{countdown.seconds}
    </div>
  );
};
