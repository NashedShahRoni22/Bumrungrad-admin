import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'

const TeleMedicine = () => {
  const [loader, setLoader] = useState(true)
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
                {teleMedicine?.map(
                  (
                    { fullName, passportId, preferredDoctor, preferredDate },
                    index
                  ) => (
                    <tr key={index} className='even:bg-blue-gray-50/50'>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {fullName}
                        </Typography>
                      </td>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {passportId}
                        </Typography>
                      </td>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {preferredDoctor}
                        </Typography>
                      </td>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {preferredDate}
                        </Typography>
                      </td>

                      <td className='p-4'>
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

export default TeleMedicine
