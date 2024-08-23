import { api } from "@/lib/axios";

type RegisterRestaurantProps = {
  email: string;
  phone: string;
  managerName: string;
  restaurantName: string;
};

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantProps) {
  await api.post("/restaurants", {
    email,
    managerName,
    phone,
    restaurantName,
  });
}

class Authenticate {
  async registerRestaurant({ email }: RegisterRestaurantProps) {
    await api.post("authenticate", { email });
  }
}
