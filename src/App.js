import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import AddDoctors from "./pages/AddDoctors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/add-doctors",
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
