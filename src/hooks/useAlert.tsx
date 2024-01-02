'use client'
import Swal, { SweetAlertOptions } from 'sweetalert2'

const useAlert = () => {
  const alertError = (options: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'error',
      ...options,
    })
  }

  const alertSuccess = (options: SweetAlertOptions) => {
    return Swal.fire({
      icon: 'success',
      ...options,
    })
  }

  return {
    alertError,
    alertSuccess,
  }
}

export default useAlert
