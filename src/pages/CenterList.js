import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@material-tailwind/react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { AiFillEye } from 'react-icons/ai'
import Loader from '../components/Loader'
const CenterList = () => {
  const [open, setOpen] = React.useState(false)
  const [loader, setLoader] = useState(true)
  const [center, setCenter] = useState([])

  const handleOpen = (data) => {
    setOpen(!open)
    //setModalData(data)
  }
  // const handaleDeleteQuery = (oneCheakUp) => {
  //   const newQueryData = checkUp.filter(
  //     (checkup) => checkup.id !== oneCheakUp.id
  //   )
  //   setCheckUp(newQueryData)
  // }

  const TABLE_HEAD = ['Image', 'Name', 'Location', 'Action']
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/centers')
      .then((res) => res.json())
      .then((data) => {
        setCenter(data?.response?.data)
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
              Center: {center?.length}
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
                {center?.map((oneCenter, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <img
                        src={oneCenter?.cover_photo}
                        alt=''
                        srcset=''
                        className='w-[60px] h-[60px] rounded-full object-cover'
                      />
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCenter?.name}
                      </Typography>
                    </td>

                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneCenter?.location}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => handleOpen(oneCenter)}
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
            <p className=''>Center List</p>
          </DialogHeader>
          <DialogBody></DialogBody>
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
                // onClick={() => {
                //   handaleDelete()
                //   handleOpen()
                // }}
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

export default CenterList
