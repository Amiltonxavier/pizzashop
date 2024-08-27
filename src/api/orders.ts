import { api } from "@/lib/axios";
import { OrdersResponse } from "@/types/ResponseApi";

type GetOrderParams = {
  pageIndex?: number;
  orderId: string | null;
  customerName: string | null;
  status: string | null;
};

type GetOrderDetails = {
  orderId: string;
};

export class OrdersService {
  async getOrder({ pageIndex, customerName, orderId, status }: GetOrderParams) {
    const response = await api.get<OrdersResponse>("/orders", {
      params: {
        pageIndex,
        customerName,
        orderId,
        status,
      },
    });
    return response.data;
  }

  async getDetaildOrderById({ orderId }: GetOrderDetails) {
    const response = await api.get(`/orders/${orderId}`);

    return response.data
  }
}
