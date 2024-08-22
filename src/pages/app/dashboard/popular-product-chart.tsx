import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart } from 'lucide-react'


import { PieChart, ResponsiveContainer, Pie } from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
    { name: 'Pizza de Margarita', amount: '6' },
    { name: 'Pizza italiana', amount: '20' },
    { name: 'Pizza com Frango frito', amount: '80' },
    { name: 'Pizza de queijo e peixe', amount: '90' },
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
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer width="100%" >
                        <PieChart style={{ fontSize: 12 }}>
                            <Pie dataKey="amount" nameKey="name" data={data} fill="#8884d8" label />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>

        </Card >
    )
}
