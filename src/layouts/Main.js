import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { DrawerBar } from '../components/DrawerBar'
import { LeftBar } from '../components/LeftBar'

export default function Main() {
  const [open, setOpen] = React.useState(false)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)
  return (
    <main>
      <Header openDrawer={openDrawer} />
      <DrawerBar
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        className='overscroll-auto  bg-deep-orange-400'
      />
      <section className='lg:flex'>
        <div className='hidden lg:block h-full'>
          <LeftBar />
        </div>
        <div className='lg:flex-1 min-h-screen'>
          <Outlet />
        </div>
      </section>
    </main>
  )
}
