import { MetricsService } from '@/api/metrics'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

export default function DayOrdersAmountCard() {

    const metricsService = new MetricsService()

    const { data: dayOrderAmount } = useQuery({
        queryKey: ['metrics', 'day-orders-amount'],
        queryFn: metricsService.getDayOrderAmount
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
                <Utensils className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {
                    dayOrderAmount && (
                        <>
                            <span className="text-3xl font-bold tracking-tight">
                                {dayOrderAmount?.amount.toLocaleString('pt-AO')}
                            </span>
                            <p className="text-xs text-muted-foreground">

                                {
                                    dayOrderAmount.diffFromYesterday >= 0 ? (
                                        <>
                                            <span className="text-emerald-500 dark:text-emerald-400">
                                                +{dayOrderAmount.diffFromYesterday}%
                                            </span>{' '}
                                            em relação a ontem
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-rose-500 dark:text-rose-400">
                                            {dayOrderAmount.diffFromYesterday}%
                                            </span>{' '}
                                            em relação a ontem
                                        </>
                                    )
                                }
                            </p>

                        </>
                    )
                }
            </CardContent>
        </Card>
    )
}
