import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'

const HealthPackage = () => {
  const [loader, setLoader] = useState(true)
  const [healthPackage, setHealthPackage] = useState([])

  const handleDelete = (centerinfo) => {
    const aggre = window.confirm(
      `You Want to Delete, ${centerinfo?.packageName}.`
    )
    if (aggre) {
      fetch(
        `https://api.bumrungraddiscover.com/api/delete/package_bookings/${centerinfo.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === 200) {
            const newQueryData = healthPackage.filter(
              (c) => c.id !== centerinfo.id
            )
            alert('Center Deleted Successfully')
            setHealthPackage(newQueryData)
          }
        })
    }
  }

  const TABLE_HEAD = [
    'Package Name',

    'patient Name',
    'HN Number',
    'email',
    'Phone Number',
    'Action',
  ]
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/package_booking')
      .then((res) => res.json())
      .then((data) => {
        setHealthPackage(data?.data)
        setLoader(false)
      })
  }, [])
  return (
    <div>
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold'>
              Health Package: {healthPackage?.length}
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
                {healthPackage?.map((hp, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hp?.packageName}
                      </Typography>
                    </td>

                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hp?.patientName}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hp?.hnNumber}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hp?.email}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hp?.phone}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => handleDelete(hp)}
                        className='px-4 py-2 shadow rounded bg-red-500 text-white flex items-center gap-2'
                      >
                        Delete
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

export default HealthPackage
