import { Button, Input, Textarea } from '@material-tailwind/react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

const AddBlogs = () => {
  const [loader1, setLoader1] = useState(false)
  const [blogImg, setBlogImg] = useState('')
  const navigate = useNavigate()

  //react quil
  const [editorValue, seteditorValue] = useState('')

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

  //post
  const handleAddBlogs = (e) => {
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
    console.log(blogs)

    const formData = new FormData()
    formData.append('blogImage', blogImg)
    formData.append('blogTitle', name)
    formData.append('blogSlogan', blogslogan)
    formData.append('blogDescription', editorValue) 
    //append data with keys
    fetch('https://api.bumrungraddiscover.com/api/add/blogs', {
      method: 'POST',
      body: formData,
    })
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
    <div className='mx-5 md:container md:mx-auto py-10 px-5'>
      <form
        onSubmit={handleAddBlogs}
        className='bg-white shadow-xl rounded-xl p-5'
      >
        <div className='flex justify-between'>
          <p className='text-2xl font-semibold'>Add Blogs</p>
          <Button className='bg-blue' type='submit'>
            {loader1 ? 'Loading...' : 'Add Blogs'}
          </Button>
        </div>

        <hr className='my-5' />
        <div className='flex flex-row items-center'>
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
          <Input required label='Blog Title' name='name' />
          <Textarea required label='Blog Slogan' name='descriptiion' />
        </div>

        <div className=''>
          <label htmlFor='' className='text-red'>
            <span className='font-semibold'>Long Description</span>
          </label>
          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            value={editorValue}
            onChange={seteditorValue}
            className='my-2.5'
          />
        </div>
      </form>
    </div>
  )
}

export default AddBlogs
