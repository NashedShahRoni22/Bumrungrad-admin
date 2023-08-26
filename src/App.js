import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import AddDoctors from "./pages/AddDoctors";
import SignIn from "./auth/SignIn";

const router = createBrowserRouter([
  {
    path:"/",
    element:<SignIn/>
  },
  {
    path: "/home",
    element: <Main />,
    children:[
      {
        path:"/home",
        element: <Home/>
      },
      {
        path:"/home/add-doctors",
        element: <AddDoctors/>
      }
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
