import { isAxiosError } from 'axios'
import useAlert from './useAlert'
import { messages } from '@/lib/utils'
import { SignInResponse } from 'next-auth/react'

const useUtils = () => {
  const { alertError } = useAlert()
  const listenerCodes = [422, 401]

  const handleRequestError = (error: unknown) => {
    if (isAxiosError(error)) {
      if (listenerCodes.includes(error.response?.status as number)) {
        alertError({
          title: messages.some_error,
          text: error.response?.data.message,
        })
        return
      }
    }

    alertError({
      title: messages.ops,
      text: messages.internal_error,
    })
  }

  const handleSignInError = (response: SignInResponse) => {
    if (response.error) {
      if (response.status === 401) {
        alertError({
          title: messages.some_error,
          text: response.error,
        })
        return
      }

      alertError({
        title: messages.ops,
        text: messages.internal_error,
      })
    }
  }

  return { handleRequestError, handleSignInError }
}

export default useUtils
