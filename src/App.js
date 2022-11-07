import React from "react";
import TwentyOne from "./components/games/TwentyOne";
import "./styles/style.css";

const App = () => {
  return (
    <>
      <header>
        <h1>Blackjack</h1>
      </header>
      <div className="body">
        <TwentyOne />
      </div>
    </>
  );
};

export default App;
