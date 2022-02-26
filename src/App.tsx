import { Suspense } from "react";
import "./App.css";
import { Router, View } from "react-navi";
import { mount, route } from "navi";
import HomePage from "./view/pages/home/HomePage";

const routes = mount({
  "/": route({ view: <HomePage /> }),
});

function App() {
  return (
    <Router routes={routes}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
}

export default App;
