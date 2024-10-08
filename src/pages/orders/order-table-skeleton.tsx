import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableRow, TableCell } from '@/components/ui/table'
import { Search } from 'lucide-react'


export function OrderTableSkeleton() {
    return Array.from({ length: 10 }).map((_, i) => {
        return (
            <TableRow key={i}>
                <TableCell>
                    <Button variant={'outline'} size={'xs'}>
                        <Search className="size-3" />
                        <span className="sr-only">Detalhes do pedido</span>
                    </Button>
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[172px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[148px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[118px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[200]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[64px]" />
                </TableCell>
                <TableCell>
                   <Skeleton className="h-4 w-[92px]" />
                </TableCell>
                <TableCell>
                   <Skeleton className="h-4 w-[92px]" />
                </TableCell>
            </TableRow>
        )
    })
    
}
