import { MetricsService } from '@/api/metrics'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Ban } from 'lucide-react'
import { MetricsCardSkeleton } from './skeleton/metrics-card-skeleton'

export default function MonthCancelOrdersAmountCard() {

    const metricsService = new MetricsService()

    const { data: monthCancelOrdersAmount } = useQuery({
        queryKey: ['metrics', 'month-cancel-orders-amount'],
        queryFn: metricsService.getMounthCanceledOrderAmount
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-base font-semibold">Cancelamento (mês)</CardTitle>
                <Ban className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {
                    monthCancelOrdersAmount ? (
                        <>
                            <span className="text-3xl font-bold tracking-tight">
                                {monthCancelOrdersAmount.amount.toLocaleString('pt-AO')}
                            </span>
                            <p className="text-xs text-muted-foreground">

                                {
                                    monthCancelOrdersAmount.diffFromLastMonth < 0 ? (
                                        <>
                                            <span className="text-emerald-500 dark:text-emerald-400">
                                                {monthCancelOrdersAmount.diffFromLastMonth}%
                                            </span>{' '}
                                            em relação ao mês passado
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-rose-500 dark:text-rose-400">
                                                +{monthCancelOrdersAmount.diffFromLastMonth}%
                                            </span>{' '}
                                            em relação ao mês passado
                                        </>
                                    )
                                }
                            </p>

                        </>
                    ): <MetricsCardSkeleton />
                }
            </CardContent>
        </Card>
    )
}
