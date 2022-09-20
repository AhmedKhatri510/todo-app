import Login from "./components/Login";
import Todo from "./components/Todo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import { Provider } from "./context";

const loginElement = (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Login />
  </div>
);

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={loginElement} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
