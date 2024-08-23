import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagedRestaurant } from '@/api/get-restaurant'
import { Skeleton } from './ui/skeleton'

export default function AccountMenu() {
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryFn: getProfile,
        queryKey: ['profile']
    })

    const { data: restaurant, isLoading: isLoadingManagedrestaurant } = useQuery({
        queryFn: getManagedRestaurant,
        queryKey: ['managed-restaurant']
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className='select-none flex items-center gap-2'>

                    {
                        isLoadingManagedrestaurant ? <Skeleton className='h-4 w-48' /> : restaurant?.name
                    }

                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='flex flex-col'>
                    {
                        isLoadingProfile ?
                            <div className='space-y-1.5'>
                                <Skeleton className='h-4 w-32' />
                                <Skeleton className='h-3 w-24' />
                            </div>
                            :
                            <>
                                <span>{profile?.name}</span>
                                <span className='text-xs font-normal text-muted-foreground'>{profile?.email}</span>
                            </>
                    }
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
