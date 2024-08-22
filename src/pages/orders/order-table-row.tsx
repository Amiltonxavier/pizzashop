import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Search, ArrowRight, X } from 'lucide-react'
import OrdersDetails from './orders-details'


export default function OrderTableRow() {
    return (
        <TableRow >
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="size-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                   <OrdersDetails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">4093902fk</TableCell>
            <TableCell className="text-muted-foreground">há 16 min</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="rounded-full size-2 bg-slate-400" />
                    <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
            </TableCell>
            <TableCell className="font-medium">Amilton Xavier</TableCell>
            <TableCell className="">
                1278kz
            </TableCell>
            <TableCell>
                <Button variant={'outline'} size={'xs'}>
                    <ArrowRight className="size-3 mr-2" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant={'ghost'} size={'xs'}>
                    <X className="size-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}
