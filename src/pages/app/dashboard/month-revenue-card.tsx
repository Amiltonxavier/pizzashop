import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'


export function MonthRevenueCard() {
    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between">
                <CardTitle className="text-base font-semibold">Receita Total (mês)</CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-3xl font-bold tracking-tight">
                    546,8654 kz
                </span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 dark:text-emerald-400">
                        +2%
                    </span>{' '}
                    em relação ao mês passado
                </p>
            </CardContent>
        </Card>
    )
}
