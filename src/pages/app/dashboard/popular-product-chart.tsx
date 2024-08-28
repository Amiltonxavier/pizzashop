import { MetricsService } from '@/api/metrics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query';
import { BarChart } from 'lucide-react'


import { PieChart, ResponsiveContainer, Pie, Cell } from 'recharts'
import colors from 'tailwindcss/colors'

const COLOR = [
    colors['violet'][500],
    colors['amber'][500],
    colors['sky'][500],
    colors['emerald'][500],
    colors['rose'][500],
]

export default function PopularProductChart() {

    const metricsService = new MetricsService()
    const { data: popularProduct } = useQuery({
        queryKey: ['metrics', 'popular-product'],
        queryFn: metricsService.getPopularProduct
    })

    return (
        <Card>
            <CardHeader className="pb-8">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                        Produtos populares
                    </CardTitle>
                    <BarChart className='text-muted-foreground size-4' />
                </div>
            </CardHeader>

            <CardContent>
                <div style={{ width: '100%', height: 260 }}>
                    {
                        popularProduct && (
                            <ResponsiveContainer width="100%" >
                                <PieChart style={{ fontSize: 12 }}>
                                    <Pie
                                        dataKey="amount"
                                        nameKey="product"
                                        data={popularProduct}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={86}
                                        innerRadius={64}
                                        strokeWidth={8}
                                        label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            value,
                                            index,
                                        }) => {
                                            const RADIAN = Math.PI / 180
                                            const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN)

                                            return (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    className="fill-muted-foreground text-xs"
                                                    textAnchor={x > cx ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                >
                                                    {popularProduct[index].product.length > 12 ?
                                                        popularProduct[index].product.substring(0, 12)
                                                            .concat('...') :
                                                        popularProduct[index].product}{' '}
                                                    ({value})
                                                </text>
                                            )
                                        }}
                                        labelLine={false}
                                    >
                                        {
                                            popularProduct.map((_, index) => {
                                                return <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLOR[index]}
                                                    className='stroke-background'
                                                />
                                            })
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        )
                    }
                </div>
            </CardContent>

        </Card >
    )
}
