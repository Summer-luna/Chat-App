import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/ui/layout";
import { Signup, action as signUpLoader } from "./pages/signup/signup";
import { Login, action as loginLoader } from "./pages/login/login";
import { History, loader as historyLoader } from "./pages/history/history";
import { Chat, loader as chatLoader } from "./pages/chat/chat";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { ErrorElement } from "./components/ui/errorElement";
import { Profile, action as profileAction } from "./pages/profile/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
        action: signUpLoader,
        errorElement: { ErrorElement },
      },
      {
        path: "login",
        element: <Login />,
        action: loginLoader,
        errorElement: { ErrorElement },
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "chat",
            element: <Chat />,
            loader: chatLoader,
            errorElement: { ErrorElement },
          },
          {
            path: "history",
            element: <History />,
            // errorElement: { ErrorElement },
            loader: historyLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            // action: profileAction,
            // errorElement: { ErrorElement },
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
