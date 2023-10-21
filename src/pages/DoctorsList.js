import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { Card, Typography } from '@material-tailwind/react'

const DoctorsList = () => {
  const [loader, setLoader] = useState(false)

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
  )
}

export default DoctorsList
