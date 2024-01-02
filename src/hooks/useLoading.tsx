import { useAppContext } from '@/contexts/AppContext'

function useLoading() {
  const { app, setApp } = useAppContext()

  const showLoading = () => {
    setApp({ ...app, loading: true })
  }

  const hideLoading = () => {
    setApp({ ...app, loading: false })
  }

  return { showLoading, hideLoading }
}

export default useLoading
