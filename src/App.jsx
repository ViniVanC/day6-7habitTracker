import React from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function App() {
  return (
    <div className="min-h-[100vh] flex flex-col bg-blue-dianne text-burnt-sienna">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
