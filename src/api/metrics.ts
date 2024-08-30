import { api } from "@/lib/axios";

type getDayOrderAmountResponse = {
  diffFromYesterday: number;
  amount: number;
};
type getMounthOrdersAmountResponse = {
  diffFromLastMonth: number;
  amount: number;
};
type getMounthCanceledOrderAmountResponse = {
  diffFromLastMonth: number;
  amount: number;
};

type getMounthRevenueResponse = {
  diffFromLastMonth: number;
  receipt: number;
};

type getPopularProductResponse = {
  product: string;
  amount: number;
}[];

type getDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

type getRevenueInPeriodByDate = {
  from?: Date;
  to?: Date;
};

export class MetricsService {
  async getDayOrderAmount() {
    const response = await api.get<getDayOrderAmountResponse>(
      "/metrics/day-orders-amount"
    );

    return response.data;
  }
  async getMounthRevenue() {
    const response = await api.get<getMounthRevenueResponse>(
      "/metrics/month-receipt"
    );
    return response.data;
  }
  async getMounthCanceledOrderAmount() {
    const response = await api.get<getMounthCanceledOrderAmountResponse>(
      "/metrics/month-canceled-orders-amount"
    );

    return response.data;
  }

  async getMounthOrdersAmount() {
    const response = await api.get<getMounthOrdersAmountResponse>(
      "/metrics/month-orders-amount"
    );
    return response.data;
  }

  async getPopularProduct() {
    const response = await api.get<getPopularProductResponse>(
      "/metrics/popular-products"
    );
    return response.data;
  }

  async getDailyRevenueInPeriod({ from, to }: getRevenueInPeriodByDate) {
    const response = await api.get<getDailyRevenueInPeriodResponse>(
      "/metrics/daily-receipt-in-period",
      {
        params: {
          from,
          to,
        },
      }
    );

    return response.data;
  }
}
