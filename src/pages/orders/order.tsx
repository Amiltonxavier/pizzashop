

import { Table, TableHead, TableHeader, TableBody, TableRow } from "@/components/ui/table";

import { Helmet } from "react-helmet-async";
import OrderTableRow from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { OrdersService } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { OrderTableSkeleton } from "./order-table-skeleton";


export function Orders() {
    const [searchParams, setSearchParams] = useSearchParams()

    const ordersServices = new OrdersService();

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const pageIndex = z.coerce.number().transform(page => page - 1).parse(searchParams.get('page') ?? '1')

    const { data: result } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],
        queryFn: () => ordersServices.getOrder({
            pageIndex,
            orderId,
            customerName,
            status: status === 'all' ? null : status 
        })
})

function handlePagination(pageIndex: number) {
    setSearchParams(prev => {
        prev.set('page', (pageIndex + 1).toString())
        return prev
    })
}

return (
    <>
        <Helmet title="Pedidos" />
        <div className="flex flex-col gap-4">
            <h1 className="tracking-tight text-3xl font-bold">Pedidos</h1>
            <div className="space-y-2.5">
                <OrderTableFilters />
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]" />
                                <TableHead className="w-[140px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado há</TableHead>
                                <TableHead className="w-[140px]">Estado</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total do pedido</TableHead>
                                <TableHead className="w-[144px]" />
                                <TableHead className="w-[132px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {

                                result ? result?.orders.map((order) => (
                                    <OrderTableRow key={order.orderId} order={order} />
                                )) : <OrderTableSkeleton />
                            }
                        </TableBody>
                    </Table>
                </div>
                {result && <Pagination onPagination={handlePagination} pageIndex={result.meta.pageIndex} totalCount={result.meta.totalCount} perPage={result.meta.perPage} />}
            </div>

        </div>
    </>
)
}
