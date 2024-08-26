import { api } from "@/lib/axios";
import { OrdersResponse } from "@/types/ResponseApi";


export class OrdersService {
  async getOrder() {
   const response = await api.get<OrdersResponse>("/orders", {
      params: {
        pageIndex: 2,
      },
    });
    return response.data
  }
}
