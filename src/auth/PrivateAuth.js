import { Navigate } from "react-router-dom";

export default function PrivateAuth({ children }) {
  const accessToken = localStorage.getItem("bumrungradToken");
  return accessToken === "bumrungradToken@2025" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
