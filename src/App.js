import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import AddDoctors from "./pages/AddDoctors";
import SignIn from "./auth/SignIn";
import AddPackages from "./pages/AddPackages";
import AddSpeciality from "./pages/AddSpeciality";
import AddCenters from "./pages/AddCenters";
import GetPackages from "./pages/GetPackages";

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
        path:"/home/add-speciality",
        element: <AddSpeciality/>
      },
      {
        path:"/home/add-doctors",
        element: <AddDoctors/>
      },
      {
        path:"/home/add-packages",
        element: <AddPackages/>
      },
      {
        path:"/home/get-packages",
        element: <GetPackages/>
      },
      {
        path:"/home/add-centers",
        element: <AddCenters/>
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
