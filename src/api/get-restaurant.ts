import { api } from "@/lib/axios";

export type getManagedRestaurantProps = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
};

export async function getManagedRestaurant() {
  //throw Error()

  //await new Promise((resolver, rejeit) => setTimeout(rejeit, 3000))
  try{
   
    const response = await api.get<getManagedRestaurantProps>('/managed-restaurant');
    return response.data
  }catch{
    throw Error()
  }
  
  
}
