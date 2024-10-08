import { api } from "@/lib/axios";

export type getProfileProps = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
};

export async function getProfile() {
  const response = await api.get<getProfileProps>("/me");
  return response.data
}
