import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Card, Typography } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'

const DoctorsList = () => {
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({});
  console.log(modalData);

  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };

  const TABLE_HEAD = [
    "Name",
    "Speciality",
    "Sub Speciality",
    "Gender",
    "Action",
  ];
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    setLoader(true);
    fetch("https://api.bumrungraddiscover.com/api/get/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data?.response?.data);
        setLoader(false);
      });
  }, []);
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <Card className="m-5 md:m-10 h-full overflow-scroll">
          <p className="p-5 text-xl font-semibold text-center">
            Total Doctors {doctors?.length}
          </p>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, i) => (
                  <th
                    key={i}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`font-normal leading-none opacity-70 ${
                        i === 4 && "text-center"
                      }`}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor, index) => (
                <tr key={index} className='even:bg-blue-gray-50/50'>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {doctor?.name}
                    </Typography>
                  </td>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {doctor?.specialty}
                    </Typography>
                  </td>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {doctor?.sub_specialty?.sub_specialty0}
                    </Typography>
                  </td>
                  <td className='p-4'>
                    <Typography
                      as='a'
                      href='#'
                      variant='small'
                      color='blue-gray'
                      className='font-medium'
                    >
                      {doctor?.gender}
                    </Typography>
                  </td>
                  <td className='p-4 flex justify-around '>
                    <button
                      onClick={() => handleOpen(doctor)}
                      className='px-4 py-2 shadow rounded bg-blue text-white '
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div>
            <h1>{modalData.name}</h1>
          </div>
        </DialogHeader>
        <DialogBody>
          <div></div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='gradient'
            color='black'
            onClick={handleOpen}
            className='mr-4'
          >
            <span>Close</span>
          </Button>
          <Button variant='gradient' color='red'>
            <span>Delete</span>
          </Button>
          <button className="px-4 py-2 shadow rounded bg-red-500 text-white ">
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DoctorsList;
