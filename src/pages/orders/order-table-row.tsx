import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Search, ArrowRight, X } from 'lucide-react'
import OrdersDetails from './orders-details'
import { OrderResponse } from '@/types/ResponseApi'
import { OrderStatus } from '@/components/order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
type Order = {
    order: OrderResponse
}

export default function OrderTableRow({ order }: Order) {
    const [ openDetailsOrder, setOpenDetailsOrder ] = useState(false)
    return (
        <TableRow >
            <TableCell>
                <Dialog open={openDetailsOrder} onOpenChange={setOpenDetailsOrder} >
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="size-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrdersDetails orderId={order.orderId} open={openDetailsOrder} />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
            <TableCell className="text-muted-foreground">{formatDistanceToNow(order.createdAt, {
                locale: ptBR,
                addSuffix: true
            })}</TableCell>
            <TableCell>
                {
                    OrderStatus(order.status)
                }
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="">
                {
                    (order.total * 100).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })
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
