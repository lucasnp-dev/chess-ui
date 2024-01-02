'use client'

import { Fragment } from 'react'
import { Spinner } from './spinner'
import { useAppContext } from '@/contexts/AppContext'

export function Loading() {
  const { app } = useAppContext()

  return (
    <Fragment>
      {app.loading && (
        <Fragment>
          <style>
            {`
              body {
                overflow: hidden;
              }
            `}
          </style>
          <div
            className="
    w-full 
    h-screen 
    flex 
    justify-center 
    items-center 
    bg-white
    bg-opacity-80 
    z-50 
    fixed
    top-0"
          >
            <Spinner />
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
