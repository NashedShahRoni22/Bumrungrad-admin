import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
const MedicalRecord = () => {
  const [loader, setLoader] = useState(true)
  const [medicalRecord, setMedicalRecord] = useState([])
  const TABLE_HEAD = ['HN Number','Passport Copy',  'Action']
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/medical/report')
      .then((res) => res.json())
      .then((data) => {
        setMedicalRecord(data.data)
        setLoader(false)
      })
  }, [])
  console.log(medicalRecord)
  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold text-center'>
              Medical Records: {medicalRecord?.length}
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
                {medicalRecord?.map(({ passport, hnNum }, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {hnNum}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <a
                        href={passport}
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

export default MedicalRecord
