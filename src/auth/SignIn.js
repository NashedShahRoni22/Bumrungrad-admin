import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import fav from '../images/favicon.png'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    if (email === 'support@discoverinternationalmedicalservice.com' && password === '@Bumrungrad24') {
      navigate('/home');
      localStorage.setItem("bumrungradToken", "bumrungradToken@2025")
      form.reset()
    } else {
      alert('Email or Password is Wrong!')
    }
  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-silver'>
      <div className='p-8 rounded-xl shadow-xl bg-white'>
        <img src={fav} alt='' className='h-[50px]' />
        <p className='text-xl font-bold my-3'>Sign In</p>
        <form
          className='flex flex-col gap-4 w-[300px] md:w-[450px]'
          onSubmit={handleLogin}
        >
          <Input name='email' label='Enter Email' type='email' size='lg' />
          <Input
            name='password'
            label='Enter Password'
            type='password'
            size='lg'
          />
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </div>
  )
}
