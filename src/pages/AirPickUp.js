import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
const AirPickUp = () => {
  const [loader, setLoader] = useState(true)
  const [airPickup, setAirPickup] = useState([])
  const TABLE_HEAD = [
    'Patient  Appointment File',
    'Air Ticket File',
    'Number of Passenger',
  ]
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/air/pickup')
      .then((res) => res.json())
      .then((data) => {
        setAirPickup(data.data)
        setLoader(false)
      })
  }, [])
  console.log(airPickup)
  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold text-center'>
              Ait Pickup: {airPickup?.length}
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
                {airPickup?.map(
                  ({ appointment, air_ticket, passenger }, index) => (
                    <tr key={index} className='even:bg-blue-gray-50/50'>
                      <td className='p-4'>
                        <a
                          href={appointment}
                          target='blank'
                          rel='noopener noreferrer'
                        >
                          <button className='px-4 py-2 shadow rounded bg-primary text-white '>
                            Appointment File
                          </button>
                        </a>
                      </td>
                      <td className='p-4'>
                        <a
                          href={air_ticket}
                          target='blank'
                          rel='noopener noreferrer'
                        >
                          <button className='px-4 py-2 shadow rounded bg-primary text-white '>
                            Passport Copy
                          </button>
                        </a>
                      </td>
                      <td className='p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {passenger}
                        </Typography>
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

export default AirPickUp
