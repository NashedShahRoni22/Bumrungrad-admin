import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
const Appointment = () => {
  const [loader, setLoader] = useState(true)
  const [appointment, setAppointment] = useState([])
  const TABLE_HEAD = [
    'Patient Name',
    'Pataient Citizenship',
    'Doctor Name',
    'Speciality',
    'Action',
  ]
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/doctor/appointments')
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data.data)
        setLoader(false)
      })
  }, [])
  console.log(appointment)
  return (
    <div>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold text-center'>
              Appointment : {appointment?.length}
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
                        className='font-normal leading-none opacity-70 
                          '
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointment?.map(
                  (
                    {
                      PataientFirstName,
                      specialty,
                      doctor,
                      PataientCitizenship,
                    },
                    index
                  ) => (
                    <tr key={index} className='even:bg-blue-gray-50/50'>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {PataientFirstName}
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
                          {PataientCitizenship}
                        </Typography>
                      </td>

                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {doctor}
                        </Typography>
                      </td>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {specialty}
                        </Typography>
                      </td>

                      <td className='p-4 flex'>
                        <button className='px-4 py-2 shadow rounded bg-blue text-white '>
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Appointment
