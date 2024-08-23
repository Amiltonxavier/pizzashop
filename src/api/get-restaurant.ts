import { api } from "@/lib/axios";

type getManagedRestaurantProps = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
};

export async function getManagedRestaurant() {
  const response = await api.get<getManagedRestaurantProps>('/managed-restaurant');
  return response.data
}
