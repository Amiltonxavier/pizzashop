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

type GetOrderDetailsResponse = {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string,
    priceInCents: number,
    quantity: number,
    product: {
        name: string
    }
  }[];
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

  async getDetaildOrderById({orderId}: GetOrderDetails) {
    console.log(orderId)
    const response = await api.get<GetOrderDetailsResponse>(
      `/orders/${orderId}`
    );

    return response.data;
  }
}
