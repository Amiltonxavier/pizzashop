import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';
import colors from 'tailwindcss/colors'
const data = [
    { date: '10/12', revenue: '6' },
    { date: '9/2', revenue: '20' },
    { date: '8/2', revenue: '80' },
    { date: '5/8', revenue: '90' },
    { date: '3/3', revenue: '4' },
    { date: '1/1', revenue: '79' },
]


export default function RevenueChart() {
    return (
        <Card>
            <CardHeader className="flex-row justify-between pb-8 items-center">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Receita no periodo
                    </CardTitle>
                    <CardDescription>
                        Receita diária no periodo
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                 <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={data} style={{ fontSize: 12 }} >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            dy={16}
                        />
                        <YAxis
                            stroke="#888"
                            axisLine={false}
                            tickLine={false}
                            width={80}
                            tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        />
                            <Tooltip />
                
                            <Line type="monotone" dataKey="revenue" stroke={colors['violet'][500]} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>          
            </CardContent>

        </Card >
    )
}
