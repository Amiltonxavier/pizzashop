import { RouterProvider } from 'react-router-dom'
import './globals.css'
import { router } from './router'
import { Toaster } from 'sonner'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme.provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
export function App() {
  return <>
    <HelmetProvider>
      <ThemeProvider storageKey='pizza.shop'>
        <Toaster richColors closeButton />
        <Helmet titleTemplate='%s | pizzashop' />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>

      </ThemeProvider>
    </HelmetProvider>
  </>
}


