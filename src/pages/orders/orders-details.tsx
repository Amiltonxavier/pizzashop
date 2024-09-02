import { OrdersService } from '@/api/orders'
import { OrderStatus } from '@/components/order-status'
import { DialogContent, DialogHeader, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead, TableFooter } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import { OrderDetailsSkeleton } from './skeleton/order-details-skeleton'

type OrdersDetailsProps = {
    orderId: string,
    open: boolean
}


export default function OrdersDetails({ orderId, open }: OrdersDetailsProps) {

    const ordersService = new OrdersService()

    const { data: order } = useQuery({
        queryKey: ['order', orderId],
        staleTime: 2000,

        queryFn: () => ordersService.getDetaildOrderById({ orderId }),
        enabled: open
    })

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: {orderId}</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>

            {
                order ? (
                    <div className='space-y-6'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='text-muted-foreground'>Estado</TableCell>
                                    <TableCell className='flex justify-end'>
                                        {OrderStatus(order?.status)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='text-muted-foreground'>Cliente</TableCell>
                                    <TableCell className='flex justify-end'>
                                        {order.customer.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='text-muted-foreground'>Telefone</TableCell>
                                    <TableCell className='flex justify-end'>
                                        {order.customer.phone ?? 'Não informado'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='text-muted-foreground'>E-mail</TableCell>
                                    <TableCell className='flex justify-end'>
                                        {order.customer.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='text-muted-foreground'>Realizado há</TableCell>
                                    <TableCell className='flex justify-end'>
                                        {
                                            formatDistanceToNow(order.createdAt, {
                                                locale: pt,
                                                addSuffix: true
                                            })
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produto</TableHead>
                                    <TableHead className='text-right'>Qtd</TableHead>
                                    <TableHead className='text-right'>Preço</TableHead>
                                    <TableHead className='text-right'>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    order.orderItems.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell className='text-right'>{item.quantity}</TableCell>
                                                <TableCell>{(item.priceInCents / 100).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</TableCell>
                                                <TableCell>{(item.priceInCents * item.quantity).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                            <TableFooter>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell>{order.totalInCents.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</TableCell>
                            </TableFooter>
                        </Table>
                    </div>
                ) : <OrderDetailsSkeleton />
            }
        </DialogContent>
    )
}
