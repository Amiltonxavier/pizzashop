import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react";

export function OrderTableFilters() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros</span>
            <Input placeholder="ID do produto" className="h-8 w-auto" />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
            <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-8">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">Todos estados</SelectItem>
                    <SelectItem value="penditing">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                    <SelectItem value="processing">Em preparo</SelectItem>
                    <SelectItem value="delivering">Em entrega</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>

                <Button type="submit" size={'xs'} variant={'secondary'}>
                    <Search className="mr-2 size-4" />
                    Filtra resultados
                </Button>
                <Button type="button" size={'xs'} variant={'outline'}>
                    <X className="mr-2 size-4" />
                    Remover filtro
                </Button>
            </Select>
        </form>
    )
}
