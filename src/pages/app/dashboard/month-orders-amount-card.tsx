import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

export default function MonthOrdersAmountCard() {
  return (
    <Card>
    <CardHeader className="flex-row items-center space-y-0 justify-between">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="space-y-1">
        <span className="text-3xl font-bold tracking-tight">
           36
        </span>
        <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 dark:text-emerald-400">
                +6%
            </span>{' '}
            em relação ao mês passado
        </p>
    </CardContent>
</Card>
  )
}
