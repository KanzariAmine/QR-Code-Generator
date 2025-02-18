import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthorizationCode from "../pages/AuthorizationCode";
import FileUploader from "../pages/FileUploader";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFoundPage /> },
  // { path: "generate_qr_code", element: <FileUploader /> },
  { path: "login", element: <Login /> },

  {
    path: "protected",
    element: <ProtectedRoute />,
    children: [
      { path: "generate_qr_code", element: <FileUploader /> },
      { path: "authorization_code", element: <AuthorizationCode /> },
    ],
  },
]);
