import { Suspense } from "react";
import "./App.css";

import HomePage from "./view/pages/home/HomePage";
import { Navigate, Route, Router, Routes } from "react-router";
import RegistrationForm from "./view/pages/register/RegistrationForm";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to="/Register"></Navigate>}></Route>
        <Route path="/HomePage" element={<HomePage />}></Route>
        <Route path="/Register" element={<RegistrationForm />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
