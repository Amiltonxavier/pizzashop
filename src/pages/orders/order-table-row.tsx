import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Search, ArrowRight, X } from 'lucide-react'
import OrdersDetails from './orders-details'
import { OrderResponse, OrdersResponse, Status } from '@/types/ResponseApi'
import { OrderStatus } from '@/components/order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrdersService } from '@/api/orders'
import { isCancel } from 'axios'
type Order = {
    order: OrderResponse
}

export default function OrderTableRow({ order }: Order) {
    const [openDetailsOrder, setOpenDetailsOrder] = useState(false)
    const queryClient = useQueryClient()
    const ordersService = new OrdersService()

    function updateOrderStatusOnCached(orderId: string, status: Status) {
        const orderListCached = queryClient.getQueriesData<OrdersResponse>({
            queryKey: ['orders']
        })

        orderListCached.forEach(([cachedKey, cachedData]) => {
            if (!cachedData) {
                return
            }
            queryClient.setQueryData<OrdersResponse>(cachedKey, {
                ...cachedData,
                orders: cachedData.orders.map((order) => {
                    if (order.orderId === orderId) {
                        return { ...order, status }
                    }

                    return order
                })
            })
        })
    }

    const { mutateAsync: approveOrderFn, isPending: isApproveOrder } = useMutation({
        mutationFn: ordersService.approveOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCached(orderId, 'processing')
        }
    })
    const { mutateAsync: cancelOrderFn,  isPending: isCancelOrder } = useMutation({
        mutationFn: ordersService.cancelOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCached(orderId, 'canceled')
        }
    })
    const { mutateAsync: deliverOrderFn,  isPending: isDeliverOrder } = useMutation({
        mutationFn: ordersService.deliverOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCached(orderId, 'delivered')
        }
    })

    const { mutateAsync: dispatchOrderFn,  isPending: isDispatchOrder } = useMutation({
        mutationFn: ordersService.dispatchOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCached(orderId, 'delivering')
        }
    })


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
                {
                    order.status === 'pending' && (
                        <Button 
                        onClick={() => approveOrderFn({orderId: order.orderId})} 
                        disabled={isApproveOrder}
                        variant={'outline'} size={'xs'}>
                            <ArrowRight className="size-3 mr-2" />
                            Aprovar
                        </Button>
                    )
                }
                {
                    order.status === 'processing' && (
                        <Button 
                        onClick={() => dispatchOrderFn({orderId: order.orderId})} 
                        disabled={isDispatchOrder}
                        variant={'outline'} size={'xs'}>
                            <ArrowRight className="size-3 mr-2" />
                            Em entrega
                        </Button>
                    )
                }
                {
                    order.status === 'delivering' && (
                        <Button 
                        onClick={() => deliverOrderFn({orderId: order.orderId})} 
                        disabled={isDeliverOrder}
                        variant={'outline'} size={'xs'}>
                            <ArrowRight className="size-3 mr-2" />
                            Entregue
                        </Button>
                    )
                }
            </TableCell>
            <TableCell>
                <Button onClick={() => cancelOrderFn({ orderId: order.orderId })} 
                disabled={!['pending', 'processing'].includes(order.status) || isCancelOrder} variant={'ghost'} size={'xs'}>
                    <X className="size-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}
