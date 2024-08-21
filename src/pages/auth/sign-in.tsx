
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Link } from "react-router-dom"

const signInForm = z.object({
  email: z.string().email(),
})

type SignFormProps = z.infer<typeof signInForm>

export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignFormProps>()

  async function handleSignIn(data: SignFormProps) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link de autenticação no seu e-mail', {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data) 
        }
      })
    } catch {
      toast.error('Credenciais inválidas')
    }

  }
  return (
    <>
      <Helmet title="Sign-in" />
      <div className="p-8">
      <Button variant={"ghost"} asChild className="absolute right-4 top-8">
          <Link to={"/sign-up"}> Novo estabelecimento</Link>
        </Button>
        <div className="w-[320px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl tracking-tight font-semibold">Acessar o painel</h1>
            <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo o painel do parceiro</p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">Acessar painel</Button>
          </form>
        </div>
      </div>
    </>

  )
}
