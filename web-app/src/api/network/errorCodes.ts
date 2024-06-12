import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { RESPONSE_CODE } from './constants'
import { toast } from 'react-toastify'
import { sideEffectLogOut } from '../../utils/common'

export const serializeErrorKeyValues = (data: any) => {
  return Object.keys(data).map(errKey => {
    const values: string | string[] = data[`${errKey}`]
    return typeof values === 'string'
      ? `${errKey === 'non_field_errors' ? '' : `${errKey}: `}${values}`
      : `${errKey === 'non_field_errors' ? '' : `${errKey}: `}${values?.join('\n')}`
  })
}

//Handle Error and show alerts.
const handleAuthErrorCode = (error: FetchBaseQueryError, showFieldErrorToast = false) => {
  console.log('error', error)
  const { status } = error
  const data: any = error.data!

  if (status === RESPONSE_CODE.PARSING_ERROR
    || status === RESPONSE_CODE.FETCH_ERROR) {
    // Handle Error 500 / HTML Response
    toast.error(
      'An unexpected fatal error has occurred. We regret the inconvenience caused. Please contact the administrator.',
      { autoClose: false }
    )
  } else if (Number(status) === RESPONSE_CODE.UNAUTHORIZED) {
    // Handle Error 401
    toast.error(
      data?.error ??
      `Your session has expired. You are being logged out. Please login again.`
    )
    setTimeout(() => {
      sideEffectLogOut()
    }, 3000)
  } else if (data?.error) {
    toast.error(data?.error)
  } else if (
    !!status &&
    Math.floor(Number(status) / 100) === 4 &&
    !!data?.meta?.message
  ) {
    toast.error(data?.meta?.message)
  } else if (showFieldErrorToast) {
    const errors = serializeErrorKeyValues(data)
    toast.error(errors?.join(' '))
  }
}

export { handleAuthErrorCode }
