import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart } from 'lucide-react'


import { PieChart, ResponsiveContainer, Pie, Cell } from 'recharts'
import colors from 'tailwindcss/colors'


const data = [
    { name: 'Group A', value: 23 },
    { name: 'Group B', value: 15 },
    { name: 'Group C', value: 23 },
    { name: 'Group D', value: 5 },
    { name: 'Group E', value: 30 },
];

const COLOR = [
    colors['violet'][500],
    colors['amber'][500],
    colors['sky'][500],
    colors['emerald'][500],
    colors['rose'][500],
]

export default function PopularProductChart() {
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
                    <ResponsiveContainer width="100%" >
                        <PieChart style={{ fontSize: 12 }}>
                            <Pie
                                dataKey="value"
                                nameKey="name"
                                data={data}
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
                                        {data[index].name.length > 12 ? data[index].name.substring(0, 12)
                                          .concat('...'): data[index].name}{' '}
                                        ({value})
                                      </text>
                                    )
                                  }}
                                  labelLine={false}
                            >
                            {
                                data.map((_,index) => {
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
                </div>
            </CardContent>

        </Card >
    )
}
