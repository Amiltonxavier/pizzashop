import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-1 pt-6 flex flex-col p-8'>
            <Outlet />
        </div>
    </div>
  )
}
