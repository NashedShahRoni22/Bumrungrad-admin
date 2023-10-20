import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'

const AirAmbulance = () => {
  const [loader, setLoader] = useState(true)
  const [airAmbulance, setAirAmbulancet] = useState([])
  const TABLE_HEAD = ['Entry Date', 'Passport Copy', 'Action']
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/air/ambulance')
      .then((res) => res.json())
      .then((data) => {
        setAirAmbulancet(data.data)
        setLoader(false)
      })
  }, [])
  console.log(airAmbulance)

  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold text-center'>
              Air Ambulance: {airAmbulance?.length}
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
                {airAmbulance?.map(({ entry_date, passport_copy }, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {entry_date}
                      </Typography>
                    </td>

                    <td className='p-4'>
                      <a
                        href={passport_copy}
                        target='blank'
                        rel='noopener noreferrer'
                      >
                        <button className='px-4 py-2 shadow rounded bg-primary text-white '>
                          Passport Copy
                        </button>
                      </a>
                    </td>
                    <td className='p-4'>
                      <button className='px-4 py-2 shadow rounded bg-blue text-white '>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AirAmbulance
