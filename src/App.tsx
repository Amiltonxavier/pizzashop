import { RouterProvider } from 'react-router-dom'
import './globals.css'
import { router } from './router'
import { Toaster } from 'sonner'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme.provider'
export function App() {
  return <>
    <HelmetProvider>
      <ThemeProvider storageKey='pizza.shop'>
        <Toaster richColors closeButton />
        <Helmet titleTemplate='%s | pizzashop' />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </>
}


