import { lazy, Suspense } from "react";
import "./App.css";

import HomePage from "./view/pages/home/HomePage";
import { Navigate, Route, Router, Routes } from "react-router";

const RegistrationForm = lazy(() => {
  return import("./view/pages/register/RegistrationForm");
});

function App() {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigate to="/Homepage"></Navigate>}></Route>
        <Route path="/HomePage" element={<HomePage />}></Route>
        <Route path="/Register" element={<RegistrationForm />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
