import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const ChildPackageDetails = () => {
  const [loader, setLoader] = useState()
  const { id } = useParams()
  const [childDetailsPackage, setChildDetailsPackage] = useState({})
  console.log(id)
  useEffect(() => {
    setLoader(true)
    fetch(`https://api.bumrungraddiscover.com/api/get/sub/package/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setChildDetailsPackage(data?.data)
          setLoader(false)
        }
        setLoader(false)
      })
  }, [id])
  return (
    <section className='mx-5 md:container md:mx-auto py-10'>
      {loader ? (
        <Loader></Loader>
      ) : (
        <div>
          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='lg:w-1/2'>
              <img
                src={childDetailsPackage?.cover_photo}
                className='w-full max-h-[50vh]'
                alt=''
              />
            </div>
            <div className='lg:w-1/2'>
              <h5 className='text-[24px] md:text-[28px] font-semibold text-blue'>
                {childDetailsPackage?.title}
              </h5>
              <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-1 gap-2.5'>
                <h5 className='text-[18px] md:text-[24px]'>
                  {' '}
                  <span className='text-blue font-semibold'>Price:</span>{' '}
                  {childDetailsPackage?.price} THB
                </h5>
                <ul className='text-[18px] md:text-[24px] list-disc'>
                  <p className='text-blue font-semibold'>Shift:</p>
                  <li className='ml-5'>{childDetailsPackage?.shift1}</li>
                  <li className='ml-5'>{childDetailsPackage?.shift1}</li>
                </ul>
                <h5 className='text-[18px] md:text-[24px]'>
                  <span className='text-blue font-semibold'>
                    Location: <br />{' '}
                  </span>
                  {childDetailsPackage?.location}
                </h5>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <h5 className='text-blue font-semibold text-xl mb-2.5'>
              Description: <br />{' '}
            </h5>{' '}
            <p>{childDetailsPackage?.description}</p>
          </div>
          {childDetailsPackage?.conditions?.length > 0 && (
            <div className='mt-5'>
              <h5 className='font-semibold text-blue text-xl'>
                Terms & Condiotions:
              </h5>
              <ul className='list-decimal ml-5 mt-2.5'>
                {childDetailsPackage?.conditions?.map((c, i) => (
                  <li key={i} className='my-1'>
                    {c?.information}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {childDetailsPackage?.inclusions?.length > 0 && (
            <div className='mt-5'>
              <h5 className='font-semibold text-blue text-xl'>
                Package Inclusions:
              </h5>
              <ul className='list-disc ml-5 mt-2.5 grid gap-2 grid-cols-2 lg:grid-cols-3'>
                {childDetailsPackage?.inclusions?.map((c, i) => (
                  <li key={i} className=''>
                    {c?.condition}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {childDetailsPackage?.exclusions?.length > 0 && (
            <div className='mt-5'>
              <h5 className='font-semibold text-blue text-xl'>
                Package Exclusions:
              </h5>
              <ul className='list-disc ml-5 mt-2.5 grid gap-2 grid-cols-2 lg:grid-cols-3'>
                {childDetailsPackage?.exclusions?.map((c, i) => (
                  <li key={i} className=''>
                    {c?.treatment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default ChildPackageDetails
