import React from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div className='flex flex-col min-h-screen items-center justify-center gap-2'>
            <h1 className='text-4xl tracking-tight font-bold'>Página não encontrada</h1>
            <p className='text-accent-foreground'>Voltar para o <Link to="/" className='text-sky-400 dark:text-sky-500 hover:text-sky-400'>Dashboard</Link></p>
        </div>
    )
}
