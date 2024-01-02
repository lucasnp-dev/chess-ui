'use client'

import { ChildrenType } from '@/@types'
import { SetStateAction, createContext, useContext, useState } from 'react'

type AppState = {
  loading: boolean
}

const initialState: AppState = {
  loading: false,
}

type AppContextType = {
  app: AppState
  setApp: React.Dispatch<SetStateAction<AppState>>
}

export const AppContext = createContext<AppContextType>({
  app: initialState,
  setApp: () => null,
})

export const AppContextProvider = ({ children }: ChildrenType) => {
  const [app, setApp] = useState<AppState>(initialState)

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
