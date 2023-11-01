import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

export default function GetPackages() {
  const [loader, setLoader] = useState(false)
  const [packages, setPackages] = useState([])

  //Delete Packsge
  const handaleDeletePackage = (p) => {
    const aggre = window.confirm(`You Want to Delete, ${p?.title}.`)
    if (aggre) {
      fetch(`https://api.bumrungraddiscover.com/api/delete/packages/${p.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === 200) {
            const newPackage = packages.filter((pc) => pc.id !== p.id)
            alert('Package Deleted Successfully')
            setPackages(newPackage)
          }
        })
    }
  }

  useEffect(() => {
    setLoader(true)
    fetch('https://api.bumrungraddiscover.com/api/get/package')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          console.log(data)
          setLoader(false)
        } else {
          setPackages(data?.data)
          setLoader(false)
        }
      })
  }, [])
  return (
    <div className='mx-5 my-5 md:container md:mx-auto p-10 bg-white rounded-xl'>
      {loader ? (
        <Loader />
      ) : (
        <>
          <p className='text-2xl font-semibold text-blue'>
            Total Packages: {packages?.length}
          </p>
          <hr className='my-5' />
          <div className='my-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {packages?.map((p, i) => (
              <div
                key={i}
                className='flex flex-col justify-between gap-2 shadow hover:shadow-xl duration-300 ease-linear'
              >
                <img src={p?.cover_photo} alt='' />
                <div className='p-2.5'>
                  <p className='font-semibold text-blue md:text-xl'>
                    {p?.title}
                  </p>
                  <p>{p?.description.slice(0, 160)}</p>
                </div>
                <div className='flex'>
                  <Link
                    className='text-center bg-blue text-white p-2.5 w-1/2 '
                    to={`/home/package_details/${p.id}`}
                  >
                    <span className='capitalize'>See Packages</span>
                  </Link>
                  <button
                    onClick={() => handaleDeletePackage(p)}
                    className=' bg-red-500 text-white p-2.5 w-1/2 '
                  >
                    <span className='capitalize'>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
