import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Main from './layouts/Main'
import AddDoctors from './pages/AddDoctors'
import SignIn from './auth/SignIn'
import AddPackages from './pages/AddPackages'
import AddSpeciality from './pages/AddSpeciality'
import AddCenters from './pages/AddCenters'
import GetPackages from './pages/GetPackages'
import Appointment from './pages/Appointment'
import DoctorsList from './pages/DoctorsList'
import AirAmbulance from './pages/AirAmbulance'
import MedicineOrder from './pages/MedicineOrder'
import AirTicket from './pages/AirTicket'
import TeleMedicine from './pages/TeleMedicine'
import AirPickUp from './pages/AirPickUp'
import MedicalRecord from './pages/MedicalRecord'
import SeeQuery from './pages/SeeQuery'
import CenterList from './pages/CenterList'
import CheakUp from './pages/CheakUp'
import ChildPackage from './pages/ChildPackage'
import ChildPackageDetails from './pages/ChildPackageDetails'
import Users from './pages/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Main />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/home/add-speciality',
        element: <AddSpeciality />,
      },
      {
        path: '/home/add-doctors',
        element: <AddDoctors />,
      },
      {
        path: '/home/add-packages',
        element: <AddPackages />,
      },
      {
        path: '/home/get-packages',
        element: <GetPackages />,
      },
      {
        path: '/home/add-centers',
        element: <AddCenters />,
      },
      {
        path: '/home/add-appointMent',
        element: <Appointment />,
      },
      {
        path: '/home/doctors-list',
        element: <DoctorsList />,
      },
      {
        path: '/home/airAmbulance',
        element: <AirAmbulance />,
      },
      {
        path: '/home/medicineOrder',
        element: <MedicineOrder />,
      },
      {
        path: '/home/teleMedicine',
        element: <TeleMedicine />,
      },
      {
        path: '/home/airTicket',
        element: <AirTicket />,
      },
      {
        path: '/home/airPickup',
        element: <AirPickUp />,
      },
      {
        path: '/home/medicalRecord',
        element: <MedicalRecord />,
      },
      {
        path: '/home/seeQuery',
        element: <SeeQuery />,
      },
      {
        path: '/home/centers-list',
        element: <CenterList />,
      },
      {
        path: '/home/check-up',
        element: <CheakUp />,
      },
      {
        path: '/home/package_details/:id',
        element: <ChildPackage />,
      },
      {
        path: '/home/childPackage_details/:id',
        element: <ChildPackageDetails />,
      },
      {
        path: '/home/users',
        element: <Users />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
