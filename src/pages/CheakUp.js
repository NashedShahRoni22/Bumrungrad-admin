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
import { AiFillEye } from 'react-icons/ai'

const CheakUp = () => {
  const [open, setOpen] = React.useState(false)
  const [loader, setLoader] = useState(true)
  const [checkUp, setCheckUp] = useState([])
  const [onecheckUp, setModalData] = useState({})

  const handleOpen = (data) => {
    setOpen(!open)
    setModalData(data)
  }

  const handaleDeleteQuery = (oneCheakUp) => {
    const newQueryData = checkUp.filter(
      (checkup) => checkup.id !== oneCheakUp.id
    )
    setCheckUp(newQueryData)
  }

  const TABLE_HEAD = [
    'Health Package',
    'Prefferd Doctor',
    'Appoinment Date',
    'Appoinment Time',
    'Action',
  ]
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/health/check_up')
      .then((res) => res.json())
      .then((data) => {
        setCheckUp(data.data)
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
              Cheak Up: {checkUp?.length}
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
                {checkUp?.map((oneCheakUp, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCheakUp?.healtePackage}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCheakUp?.prefferdDoctor}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCheakUp?.appoinMentDate}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCheakUp?.appoinMentTime}
                      </Typography>
                    </td>

                    <td className='p-4'>
                      <button
                        onClick={() => handleOpen(oneCheakUp)}
                        className='px-4 py-2 shadow rounded bg-blue text-white flex items-center gap-2'
                      >
                        <AiFillEye className='text-xl' />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        <Dialog open={open} handler={handleOpen} size='lg'>
          <DialogHeader className=''>
            <p className=''>Cheak Up</p>
          </DialogHeader>
          <DialogBody>
            <div className='grid grid-cols-1'>
              <div>
                <h5 className='text-lg font-semibold'>Patient Information</h5>
                <hr className='my-2.5' />
                <p className='mt-2.5'>
                  <span className='font-semibold'>Patient Name : </span>
                  {onecheckUp?.patientName}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>HN Number : </span>
                  {onecheckUp?.HnNumber}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>Medical Concern : </span>
                  {onecheckUp?.medicalConcern}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>Email : </span>
                  {onecheckUp?.email}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>Phone : </span>
                  {onecheckUp?.phone}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>Gender : </span>
                  {onecheckUp?.gender}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>DOB : </span>
                  {onecheckUp?.dob}
                </p>
                <p className='mt-2.5'>
                  <span className='font-semibold'>Nationality : </span>
                  {onecheckUp?.nationality}
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div>
              <Button
                variant='gradient'
                color='black'
                onClick={handleOpen}
                className='mr-4'
              >
                <span>Close</span>
              </Button>
              <Button
                onClick={() => {
                  handaleDeleteQuery(onecheckUp)
                  handleOpen()
                }}
                variant='gradient'
                color='red'
              >
                <span>Delete</span>
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )
}

export default CheakUp
