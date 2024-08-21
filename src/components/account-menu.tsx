import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Building, ChevronDown, LogOut } from 'lucide-react'

export default function AccountMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className='select-none flex items-center gap-2'>
                    Pizza.shop
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='flex flex-col'>
                    <span>Amilton Xavier</span>
                    <span className='text-xs font-normal text-muted-foreground'>amiltonxavier1999@gmail.com</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Building className='size-4 mr-2' />
                    <span>Perfil da loja</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut className='size-4 mr-2 text-rose-500 dark:text-rose-400' />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
