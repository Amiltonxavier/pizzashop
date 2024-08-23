import { api } from "@/lib/axios";

type SignInProps = {
  email: string;
};

export async function signIn({ email }: SignInProps) {
    await api.post("/authenticate", { email });
  }


class Authenticate {
  async signIn({ email }: SignInProps) {
    await api.post("authenticate", { email });
  }
}
