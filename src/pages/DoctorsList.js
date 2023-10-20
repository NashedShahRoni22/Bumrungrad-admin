import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { Card, Typography } from '@material-tailwind/react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

const DoctorsList = () => {
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = useState({})

  const handleOpen = (data) => {
    setOpen(!open)
    setModalData(data)
  }

  const TABLE_HEAD = [
    'Name',
    'Speciality',
    'Sub Speciality',
    'Gender',
    'Action',
  ]
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    setLoader(true)
    fetch('https://api.bumrungraddiscover.com/api/get/doctors')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data?.response?.data)
        setLoader(false)
      })
  }, [])
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <Card className='m-5 md:m-10 h-full overflow-scroll'>
          <p className='p-5 text-xl font-semibold text-center'>
            Total Doctors {doctors?.length}
          </p>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head, i) => (
                  <th
                    key={i}
                    className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className={`font-normal leading-none opacity-70 ${
                        i === 4 && 'text-center'
                      }`}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors?.map(
                (doctor, index) => (
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
                      <button className='px-4 py-2 shadow rounded bg-red-500 text-white '>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default DoctorsList
