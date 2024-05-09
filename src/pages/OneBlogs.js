import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { Button, Input, Textarea } from '@material-tailwind/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

const OneBlogs = () => {
  const { slug } = useParams()
  const [loader, setLoader] = useState(true)
  const [oneBlog, setOneBlog] = useState({})
  const [preview, setPreview] = useState(false)
  const [loader1, setLoader1] = useState(false)
  const [blogImg, setBlogImg] = useState('')

  const navigate = useNavigate()
  //react quil....

  const [editorValue, seteditorValue] = useState()

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video', 'code-block'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  // get data
  useEffect(() => {
    fetch(`https://api.bumrungraddiscover.com/api/get/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setOneBlog(data.data)
        seteditorValue(data.data.blogDescription)
        setLoader(false)
      })
  }, [slug])

  //update blog
  const handleUpdateBlogs = (e) => {
    setLoader1(true)
    e.preventDefault()
    const name = e.target.name.value
    const blogslogan = e.target.descriptiion.value
    const blogs = {
      blogImg,
      name,
      blogslogan,
      editorValue,
    }
    // console.log(blogs)

    const formData = new FormData()
    formData.append('blogImage', blogImg)
    formData.append('blogTitle', name)
    formData.append('blogSlogan', blogslogan)
    formData.append('blogDescription', editorValue)
    //append data with keys
    fetch(
      `https://api.bumrungraddiscover.com/api/update/blogs/${oneBlog?.slug}`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoader1(false)
        navigate('/home/blogs-list')
        e.target.reset()
      })
      .catch((e) => console.error(e))
  }
  return (
    <div className='p-5 my-5 md:container md:mx-auto'>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className='flex justify-between'>
            <p className='text-2xl font-semibold'>Update Blogs</p>
            {preview ? (
              <Button
                onClick={() => setPreview(!preview)}
                className='bg-red-500'
              >
                Cancel
              </Button>
            ) : (
              <Button onClick={() => setPreview(!preview)} className='bg-blue'>
                Preview
              </Button>
            )}
          </div>

          <hr className='my-5' />
          {preview ? (
            <div className='lg:flex gap-5 bg-white shadow-xl rounded-xl p-5'>
              <img className='lg:w-1/2' src={oneBlog?.blogImage} alt='' />
              <div className='lg:w-1/2'>
                <p>{oneBlog?.blogTitle}</p>
                <p>{oneBlog?.blogSlogan}</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleUpdateBlogs}
              className='bg-white shadow-xl rounded-xl p-5'
            >
              <img className='h-[200px]' src={oneBlog?.blogImage} alt='' />
              <div className='flex flex-row items-center mt-5'>
                <input
                  type='file'
                  id='custom-input'
                  onChange={(e) => setBlogImg(e.target.files[0])}
                  hidden
                />
                <label
                  htmlFor='custom-input'
                  className='block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue duration-300 ease-linear text-white cursor-pointer'
                >
                  Choose Blog Image
                </label>
                <label className='text-sm text-slate-500'>
                  {blogImg.name ? blogImg.name : 'No File Chosen'}
                </label>
              </div>
              <p className='text-red-400 text-sm mt-2.5'>
                Image Ratio - 1200*628. Image size not more than 500kb
              </p>
              <div className='my-4 flex flex-col gap-y-4'>
                <Input
                  defaultValue={oneBlog?.blogTitle}
                  required
                  label='Blog Title'
                  name='name'
                />
                <Textarea
                  defaultValue={oneBlog?.blogSlogan}
                  required
                  label='Blog Slogan'
                  name='descriptiion'
                  rows={8}
                />
                <ReactQuill
                  theme='snow'
                  modules={modules}
                  formats={formats}
                  value={editorValue}
                  onChange={seteditorValue}
                  className='my-2.5'
                />
              </div>
              <Button className='bg-blue' type='submit'>
                {loader1 ? 'Loading...' : 'Update Blogs'}
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default OneBlogs
