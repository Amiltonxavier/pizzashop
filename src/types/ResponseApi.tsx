export  type Status = "pending" | "canceled" | "processing" | "delivering" | "delivered";

export type OrderResponse = {
    orderId: string;
    createdAt: string;
    status: Status
    customerName: string;
    total: number;
}
export type OrdersResponse = {
  orders: OrderResponse[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};