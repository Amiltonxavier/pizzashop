import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
});

type OrderFilter = z.infer<typeof orderFilterSchema>


export function OrderTableFilters() {

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const { register, control, handleSubmit, reset } = useForm({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? 'all'
        }
    })

    function handleFilter({ orderId, customerName, status }: OrderFilter){
        setSearchParams(state => {
            if(orderId){
                state.set('orderId', orderId)
            }else{
                state.delete('orderId')
            }

            if(customerName){
                state.set('customerName', customerName)
            }else{
                state.delete('customerName')
            }
            if(status){
                state.set('status', status)
            }else{
                state.delete('status')
            }

            state.set('page', '1')

            return state
        })
    }

    function handleCleanFilter(){
        setSearchParams(state => {
            state.delete('orderId')
            state.delete('customerName'),
            state.delete('status')
            state.set('page', '1')
            return state
        })

        reset({
            orderId: '',
            status: 'all',
            customerName: ''
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros</span>
            <Input placeholder="ID do produto" {...register('orderId')} className="h-8 w-auto" />
            <Input placeholder="Nome do cliente" {...register('customerName')} className="h-8 w-[320px]" />
            {
                <Controller
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => {
                        return (
                            <Select defaultValue="all" name={name} value={value} onValueChange={onChange} disabled={disabled}>
                                <SelectTrigger className="w-[180px] h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos estados</SelectItem>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="canceled">Cancelado</SelectItem>
                                    <SelectItem value="processing">Em preparo</SelectItem>
                                    <SelectItem value="delivering">Em entrega</SelectItem>
                                    <SelectItem value="delivered">Entregue</SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }}
                />
            }
            <Button type="submit" size={'xs'} variant={'secondary'}>
                <Search className="mr-2 size-4" />
                Filtra resultados
            </Button>
            <Button onClick={handleCleanFilter} type="button" size={'xs'} variant={'outline'}>
                <X className="mr-2 size-4" />
                Remover filtro
            </Button>
        </form>
    )
}
