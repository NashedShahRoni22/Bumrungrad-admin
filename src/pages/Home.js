import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
export default function Home() {
  const [loader, setLoader] = useState(true)
  const [allData, setAllDta] = useState()

  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/category/length')
      .then((res) => res.json())
      .then((data) => {
        setAllDta(Object.values(data?.data))
        setLoader(false)
      })
  }, [])
  //console.log(allData?.length)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 md:container  md:mx-auto gap-6 '>
      {loader ? (
        <Loader></Loader>
      ) : (
        <>
          {allData?.map((d, i) => (
            <Link to={d.link} className='mx-5'>
              <Card key={i} className='p-8 text-black'>
                <p className='text-3xl lg:text-5xl font-bold'>{d.length}</p>
                <p className='text-xl lg:text-3xl text-end'>{d.name}</p>
              </Card>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
