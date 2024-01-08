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
    <section className='py-10 mx-10 md:container  md:mx-auto'>
      <h1 className='text-3xl font-semibold'>Explore</h1>
      <div className='mt-5'>
      {loader ? (
        <Loader/>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {allData?.map((d, i) => (
            <Link to={d.link}>
              <Card key={i} className='p-5 text-black shadow-blue hover:shadow-xl duration-300 ease-linear'>
                <p className='text-4xl font-bold text-center text-blue'>{d.length}</p>
                <p className='text-center font-semibold mt-2.5'>{d.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
    </section>
  )
}
