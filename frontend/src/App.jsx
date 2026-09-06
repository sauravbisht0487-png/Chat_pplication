import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: (
  <ProtectedRoute><HomePage />
  </ProtectedRoute>) },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
