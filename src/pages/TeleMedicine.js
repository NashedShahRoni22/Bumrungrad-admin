import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

const TeleMedicine = () => {
  const [loader, setLoader] = useState(true)

  const [open, setOpen] = React.useState(false)
  const [teleMedicineModalData, setModalData] = useState({})
  const handleOpen = (data) => {
    setOpen(!open)
    setModalData(data)
  }

  const [teleMedicine, setTeleMedicine] = useState([])
  const TABLE_HEAD = [
    'Patient Name',
    'Passport Number',
    'Doctor Name',
    'Appointment Date',
    'Action',
  ]
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/tele/medicine')
      .then((res) => res.json())
      .then((data) => {
        setTeleMedicine(data.data)
        setLoader(false)
      })
  }, [])
  console.log(teleMedicine)

  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold text-center'>
              Tele Medicine: {teleMedicine?.length}
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
                        className='font-normal leading-none opacity-70 '
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teleMedicine?.map((oneTelemedicine, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTelemedicine?.fullName}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTelemedicine?.passportId}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTelemedicine?.preferredDoctor}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTelemedicine?.preferredDate}
                      </Typography>
                    </td>

                    <td className='p-4'>
                      <button
                        onClick={() => handleOpen(oneTelemedicine)}
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
            <div>Tele Medicine</div>
          </DialogHeader>
          <DialogBody>
            <div>
              <h1>{teleMedicineModalData?.fullName}</h1>
            </div>
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
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )
}

export default TeleMedicine
