import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { Card, Typography } from '@material-tailwind/react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { AiFillEye } from 'react-icons/ai'

const DoctorsList = () => {
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = useState({})
  const handleOpen = (data) => {
    setOpen(!open)
    setModalData(data)
  }
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
                    <button
                      onClick={() => handleOpen(doctor)}
                      className='flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white '
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
      <Dialog
        open={open}
        handler={handleOpen}
        size='xl'
        className='h-[42rem] overflow-scroll'
      >
        <DialogBody>
          <section>
            {/* doctor info  */}
            <div className='flex flex-col lg:flex-row gap-5 p-5'>
              <div className='lg:w-1/2 flex flex-col lg:flex-row gap-5 lg:gap-10'>
                {/* left side  */}
                <div className='flex justify-center lg:items-center'>
                  <img
                    src={modalData?.image}
                    alt=''
                    className='h-[120px] w-[120px] rounded-full'
                  />
                </div>
                {/* middle side  */}
                <div className='flex-1 text-blue'>
                  <p className='text-xl md:text-2xl font-bold'>
                    {modalData?.name}
                  </p>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='font-semibold mt-5 text-xl md:text-2xl lg:text-3xl capitalize'>
                        Expertise
                      </p>
                      {/* <Divider className="!my-2.5" /> */}
                      <p className='text-lg'>{modalData?.specialty}</p>
                    </div>
                    <div>
                      <p className='font-semibold mt-5 text-xl md:text-2xl lg:text-3xl capitalize'>
                        Specialty
                      </p>
                      {/* <Divider className="!my-2.5" /> */}
                      <ul className=''>
                        {modalData?.sub_specialty?.map((ss, i) => (
                          <li key={i} className='text-lg'>
                            {ss}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className='font-semibold mt-5 text-xl md:text-2xl lg:text-3xl capitalize'>
                        Language
                      </p>
                      {/* <Divider className="!my-2.5" /> */}
                      <ul className=''>
                        {modalData?.lang?.map((ss, i) => (
                          <li key={i} className='text-lg'>
                            {ss}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* left side  */}
              <div className='lg:w-1/2'>
                <p className='mb-5 text-xl md:text-2xl text-blue font-semibold'>
                  Schedules:
                </p>
                <Card className='h-full w-full overflow-scroll'>
                  <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                      <tr>
                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal leading-none opacity-70'
                          >
                            Day
                          </Typography>
                        </th>
                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal leading-none opacity-70'
                          >
                            Arrival
                          </Typography>
                        </th>
                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal leading-none opacity-70'
                          >
                            Leave
                          </Typography>
                        </th>
                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal leading-none opacity-70'
                          >
                            Shift
                          </Typography>
                        </th>
                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal leading-none opacity-70'
                          >
                            Location
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalData?.day?.map((day, i) => {
                        const isLast = i === day.length - 1
                        const classes = isLast
                          ? 'p-4'
                          : 'p-4 border-b border-blue-gray-50'
                        return (
                          <tr key={i}>
                            <td className={classes}>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {day}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {modalData?.arrival?.[i]}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {modalData?.leave?.[i]}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {modalData?.shift?.[i]}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as='a'
                                href='#'
                                variant='small'
                                color='blue-gray'
                                className='font-medium'
                              >
                                {modalData?.location?.[i]}
                              </Typography>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>

            {/* qualifications  */}
            <div className='p-5 lg:mt-10'>
              <div className='grid grid-cols-2 gap-5'>
                <div>
                  <p className='text-xl md:text-2xl text-blue font-semibold'>
                    Medical School:
                  </p>
                  <p className='mt-2.5 text-xl md:mt-5'>
                    - {modalData?.school}
                  </p>
                </div>
                {modalData?.certificates?.length !== 0 && (
                  <div className=''>
                    <p className='text-xl md:text-2xl text-blue font-semibold'>
                      Certifications:
                    </p>
                    <ul className='mt-2.5 md:mt-5'>
                      {modalData?.certificates?.map((dc, i) => (
                        <li key={i} className='text-xl'>
                          - {dc?.certificate}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData?.interests?.length !== 0 && (
                  <div className=''>
                    <p className='text-xl md:text-2xl text-blue font-semibold'>
                      Article:
                    </p>
                    <ul className='mt-2.5 md:mt-5'>
                      {modalData?.interests?.map((dc, i) => (
                        <li key={i} className='text-xl'>
                          - {dc?.Interest}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData?.experiences?.length !== 0 && (
                  <div className=''>
                    <p className='text-xl md:text-2xl text-blue font-semibold'>
                      Experiences:
                    </p>
                    <ul className='mt-2.5 md:mt-5'>
                      {modalData?.experiences?.map((dc, i) => (
                        <li key={i} className='text-xl'>
                          - {dc?.experience}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData?.researches?.length !== 0 && (
                  <div className=''>
                    <p className='text-xl md:text-2xl text-blue font-semibold'>
                      Researches:
                    </p>
                    <ul className='mt-2.5 md:mt-5'>
                      {modalData?.researches?.map((dc, i) => (
                        <li key={i} className='text-xl'>
                          - {dc?.research}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData?.article?.length !== 0 && (
                  <div className=''>
                    <p className='text-xl md:text-2xl text-blue font-semibold'>
                      Articles:
                    </p>
                    <ul className='mt-2.5 md:mt-5'>
                      {modalData?.article?.map((dc, i) => (
                        <li key={i} className='text-xl'>
                          - {dc?.article}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <button className='px-4 py-2 shadow rounded bg-red-500 text-white '>
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default DoctorsList
