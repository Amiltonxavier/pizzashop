import { Helmet } from "react-helmet-async"
import { MonthRevenueCard } from "./month-revenue-card"
import MonthOrdersAmountCard from "./month-orders-amount-card"
import DayOrdersAmountCard from "./day-orders-amount-card"
import MonthCancelOrdersAmountCard from "./month-cancel-orders-amount-card"
import RevenueChart from "./revenue-chart"
import PopularProductChart from "./popular-product-chart"

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

        <div className="flex flex-col gap-4">
          <h1 className="tracking-tight text-3xl font-bold">Dashboard</h1>
          <div className="grid sm:grid-cols-4 gap-4">
            <MonthRevenueCard />
            <MonthOrdersAmountCard />
            <DayOrdersAmountCard />
            <MonthCancelOrdersAmountCard />
          </div>
          <div className="grid sm:grid-cols-9 gap-4">
            <div className="sm:col-span-6">
                <RevenueChart />
            </div>
            <div className="sm:col-span-3">
              <PopularProductChart />
            </div>
          </div>
      </div>

    </>

  )
}
