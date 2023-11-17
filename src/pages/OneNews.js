import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'

const OneNews = () => {
  const { id } = useParams()
  const [loader, setLoader] = useState(true)
  const [oneNews, setNews] = useState({})
  useEffect(() => {
    fetch(`https://api.bumrungraddiscover.com/api/get/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data)
        setLoader(false)
      })
  }, [id])
  return (
    <div className='p-5 my-5 md:container md:mx-auto'>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div className='md:h-96 flex justify-center'>
            <img
              src={oneNews?.newsImage}
              alt=''
              srcset=''
              className='h-[100%]'
            />
          </div>
          <div className='mt-10'>
            <h5 className='font-semibold text-blue text-xl'>
              {oneNews?.newsTitle}
            </h5>
            <h5 className='my-3'>{oneNews?.newsDescription}</h5>
          </div>
        </div>
      )}
    </div>
  )
}

export default OneNews
