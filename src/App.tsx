import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import "./styles.scss";

const App: React.FC = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>) as React.ReactNode}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":characterId" element={<Character />} />
      </Routes>
    </Suspense>
  );
};

export default App;
