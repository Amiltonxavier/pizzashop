import { Status } from "@/types/ResponseApi"


const orderStatusMap: Record<Status, string> = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    delivered: 'Entregue',
    delivering: 'Em entrega',
    processing: 'Em preparo'

}

export function OrderStatus(status: Status) {
    return (
        <div className="flex items-center gap-2">
            { status === 'pending' && <span className="rounded-full size-2 bg-slate-400" /> }
            { status === 'canceled' && <span className="rounded-full size-2 bg-rose-500" /> }
            { ['processing', 'delivering'].includes(status) && <span className="rounded-full size-2 bg-amber-500" /> }
            { status === 'delivered' && <span className="rounded-full size-2 bg-emerald-500" /> }
            <span className="font-medium text-muted-foreground">{ orderStatusMap[status] }</span>
        </div>
    )
}
