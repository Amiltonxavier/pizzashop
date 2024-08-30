import { MetricsService } from "@/api/metrics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';
import colors from 'tailwindcss/colors'
import { Label } from '@/components/ui/label'
import { DatePickerRange } from "@/components/ui/date-range-picker";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export default function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date()
    })
    const metricsService = new MetricsService()

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'daily-Revenue-in-period', dateRange],
        queryFn: () => metricsService.getDailyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to })
    })

    const chartItem = useMemo(() => {
       return dailyRevenueInPeriod?.map((chartItem) => {
            return {
                date: chartItem.date,
                receipt: chartItem.receipt / 100
            }
        })
    }, [dailyRevenueInPeriod])



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
                <div className="flex items-center gap-3">
                    <Label>Periodo</Label>
                    <DatePickerRange date={dateRange} onDateChange={setDateRange} />
                </div>
            </CardHeader>

            <CardContent>
                {
                    chartItem && (
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={chartItem} style={{ fontSize: 12 }} >
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
                                    tickFormatter={(value: number) => value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                />
                                <Tooltip />

                                <Line type="monotone" dataKey="receipt" stroke={colors['violet'][500]} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )
                }

            </CardContent>

        </Card >
    )
}
