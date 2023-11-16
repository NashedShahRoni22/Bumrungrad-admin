import { Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const AddNews = () => {
  const [loader1, setLoader1] = useState(false)
  const [loader, setLoader] = useState(true)
  const [newsImg, setnewsImg] = useState('')
  const [allNews, setAllNews] = useState([])

  //post...
  const handleAddNews = (e) => {
    setLoader1(true)
    e.preventDefault()
    const name = e.target.name.value
    const descriptiion = e.target.descriptiion.value
    const news = {
      newsImg,
      name,
      descriptiion,
    }
    console.log(news)
    console.log(newsImg, name, descriptiion)

    const formData = new FormData()
    formData.append('newsImage', newsImg)
    formData.append('newsTitle', name)
    formData.append('newsDescription', descriptiion)
    fetch('https://api.bumrungraddiscover.com/api/add/news', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoader1(false)
        e.target.reset()
      })
      .catch((e) => console.error(e))
  }
  //get news ...../
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/news')
      .then((res) => res.json())
      .then((data) => {
        setAllNews(data.data)
        setLoader(false)
      })
  }, [loader, loader1])

  //Delete...

  const handaleDeleteBlock = (oneNews) => {
    const aggre = window.confirm(`You Want to Delete, ${oneNews?.newsTitle}.`)
    if (aggre) {
      fetch(`https://api.bumrungraddiscover.com/api/delete/news/${oneNews.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === 200) {
            const newNewsData = allNews.filter((news) => news.id !== oneNews.id)
            alert('News Deleted Successfully')
            setAllNews(newNewsData)
          }
        })
    }
  }

  return (
    <div className='mx-5 md:container md:mx-auto py-10 px-5'>
      <form
        onSubmit={handleAddNews}
        className='bg-white shadow-xl rounded-xl p-5'
      >
        <p className='text-2xl font-semibold'>Add News</p>
        <hr className='my-5' />
        <div className='flex flex-row items-center'>
          <input
            type='file'
            id='custom-input'
            onChange={(e) => setnewsImg(e.target.files[0])}
            hidden
          />
          <label
            htmlFor='custom-input'
            className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
          >
            Choose News Image
          </label>
          <label className='text-sm text-slate-500'>
            {newsImg.name ? newsImg.name : 'No File Chosen'}
          </label>
        </div>
        <p className='text-red-400 text-sm mt-2.5'>
          Image Ratio - 1200*628. Image size not more than 500kb
        </p>
        <div className='my-4 flex flex-col gap-y-4'>
          <Input required label='News Title' name='name' />
          <Input required label='News Description' name='descriptiion' />
        </div>
        <Button className='bg-blue' type='submit'>
          {loader1 ? 'Loading...' : 'Add News'}
        </Button>
      </form>

      <div className='mt-10'>
        <p className='text-2xl font-semibold'>News List</p>
        <hr className='my-5' />
        {loader ? (
          <Loader />
        ) : (
          <div>
            <div className='p-5 md:p-10 my-5 md:container md:mx-auto'>
              <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 my-10'>
                {allNews?.map((d, i) => (
                  <div
                    key={i}
                    className='shadow rounded hover:shadow-xl duration-300 ease-linear'
                  >
                    <img src={d?.newsImage} alt='' className='' />
                    <div className='p-4'>
                      <h5 className='font-semibold text-blue text-lg'>
                        {d?.newsTitle}
                      </h5>
                      <h5 className='my-3'>
                        {d?.newsDescription?.slice(0, 160)} ...
                      </h5>
                      <div className='flex justify-between'>
                        <Link to={`/home/one-News/${d?.id}`}>
                          <button className='border border-blue bg-blue hover:bg-white px-2 py-1 rounded hover:text-blue text-white duration-300 ease-linear'>
                            Read More
                          </button>
                        </Link>

                        <button
                          onClick={() => handaleDeleteBlock(d)}
                          className='border border-red-400 bg-red-400 hover:bg-white px-2 py-1 rounded hover:text-blue text-white duration-300 ease-linear'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddNews
