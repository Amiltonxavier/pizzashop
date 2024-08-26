import { api } from "@/lib/axios";
import { OrdersResponse } from "@/types/ResponseApi";

type GetOrderParams = {
  pageIndex?: number
}

export class OrdersService {
  async getOrder({pageIndex}: GetOrderParams) {
   const response = await api.get<OrdersResponse>("/orders", {
      params: {
        pageIndex
      },
    });
    return response.data
  }
}
