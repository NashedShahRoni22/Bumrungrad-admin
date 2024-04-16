import React from 'react'
import { SyncLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SyncLoader
        color={'#28266F'}
        loading={true}
        size={20}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}
