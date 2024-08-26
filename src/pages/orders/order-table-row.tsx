import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Search, ArrowRight, X } from 'lucide-react'
import OrdersDetails from './orders-details'
import { OrderResponse } from '@/types/ResponseApi'
import { OrderStatus } from '@/components/order-status'

type Order = {
    order: OrderResponse
}

export default function OrderTableRow({ order }: Order) {
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
            <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
            <TableCell className="text-muted-foreground">há 16 min</TableCell>
            <TableCell>
                {
                    OrderStatus(order.status)
                }
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="">
                {
                    order.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }
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
