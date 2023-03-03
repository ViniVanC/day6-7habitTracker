import React, { createContext, useContext } from "react";

const HabitsContext = createContext();
export const useHabits = () => useContext(HabitsContext);

export const HabitsProvider = ({ children }) => {
  return <HabitsContext.Provider value={{}}>{children}</HabitsContext.Provider>;
};
