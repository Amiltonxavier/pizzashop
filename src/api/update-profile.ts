import { api } from "@/lib/axios";

type ProfileProps = {
  name: string;
  description: string | null;
};

export async function updateProfile({ name, description }: ProfileProps) {
  /* 
    tentado interface otimista, forçando um erro: 
    await new Promise((_, rejeit) => setTimeout(rejeit, 3000)) 
  */
  await api.put("/profile", { name, description });
}
