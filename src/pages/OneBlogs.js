import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const OneBlogs = () => {
  const { id } = useParams()
  const [loader, setLoader] = useState(true)
  const [oneBlog, setOneBlog] = useState({})
  useEffect(() => {
    fetch(`https://api.bumrungraddiscover.com/api/get/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOneBlog(data.data)
        setLoader(false)
      })
  }, [id])
  return (
    <div className='p-5 my-5 md:container md:mx-auto'>
      {loader ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='md:h-96 flex justify-center'>
            <img
              src={oneBlog?.blogImage}
              alt=''
              srcset=''
              className='h-[100%]'
            />
          </div>
          <div className='mt-10'>
            <h5 className='font-semibold text-blue text-xl'>
              {oneBlog?.blogTitle}
            </h5>
            <h5 className='my-3'>{oneBlog?.blogDescription}</h5>
          </div>
        </div>
      )}
    </div>
  )
}

export default OneBlogs
