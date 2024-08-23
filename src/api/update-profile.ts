import { api } from "@/lib/axios";

type ProfileProps = {
  name: string;
  description: string | null;
};

export async function updateProfile({ name, description }: ProfileProps) {
  await api.put("/profile", { name, description });
}
