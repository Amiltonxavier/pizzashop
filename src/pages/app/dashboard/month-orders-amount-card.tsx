import { MetricsService } from '@/api/metrics'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { MetricsCardSkeleton } from './skeleton/metrics-card-skeleton'

export default function MonthOrdersAmountCard() {

    const metricsService = new MetricsService()
    const { data: mounthOrderAmount } = useQuery({
        queryKey: ['metrics', 'mounth-order-amount'],
        queryFn: metricsService.getMounthOrdersAmount
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
                <Utensils className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {
                    mounthOrderAmount ? (
                        <>
                            <span className="text-3xl font-bold tracking-tight">
                                {mounthOrderAmount?.amount.toLocaleString('pt-AO')}
                            </span>
                            <p className="text-xs text-muted-foreground">

                                {
                                    mounthOrderAmount.diffFromLastMonth >= 0 ? (
                                        <>
                                            <span className="text-emerald-500 dark:text-emerald-400">
                                                +{mounthOrderAmount.diffFromLastMonth}%
                                            </span>{' '}
                                            em relação ao mês passado
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-rose-500 dark:text-rose-400">
                                                {mounthOrderAmount.diffFromLastMonth}%
                                            </span>{' '}
                                            em relação ao mês passado
                                        </>
                                    )
                                }
                            </p>

                        </>
                    ) : <MetricsCardSkeleton />
                }
            </CardContent>
        </Card>
    )
}
