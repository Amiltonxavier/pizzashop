import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AppLayout() {

  const navigate = useNavigate()

  useEffect(() => {
    const interceptionId = api.interceptors.response.use(
      response => response,
      error => {
        if(isAxiosError(error)){
          const status = error.response?.status
          const code = error.response?.data.code

          if(status === 401 && code === 'UNAUTHORIZED'){
            navigate('/sign-in', { replace: true })
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptionId)
    }

  }, [navigate])

  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-1 pt-6 flex flex-col p-8'>
            <Outlet />
        </div>
    </div>
  )
}
