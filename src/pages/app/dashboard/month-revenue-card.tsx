import { MetricsService } from '@/api/metrics'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { MetricsCardSkeleton } from './skeleton/metrics-card-skeleton'


export function MonthRevenueCard() {

    const metricsService = new MetricsService()

    const { data: monthRevenue } = useQuery({
        queryKey: ['metrics', 'month-revenue'],
        queryFn: metricsService.getMounthRevenue
    })

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-base font-semibold">Receita Total (mês)</CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {
                    monthRevenue ? (
                        <>
                            <span className="text-3xl font-bold tracking-tight">
                                {monthRevenue.receipt.toLocaleString('pt-AO', {
                                    style: 'currency',
                                    currency: 'AOA'
                                })}
                            </span>
                            <p className="text-xs text-muted-foreground">

                                {
                                    monthRevenue.diffFromLastMonth >= 0 ? (
                                        <>
                                            <span className="text-emerald-500 dark:text-emerald-400">
                                                +{monthRevenue.diffFromLastMonth}%
                                            </span>{' '}
                                            em relação ao mês passado
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-rose-500 dark:text-rose-400">
                                                {monthRevenue.diffFromLastMonth}%
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
