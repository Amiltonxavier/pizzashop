
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurent"

const signupForm = z.object({
  email: z.string().email(),
  phone: z.string(),
  managerName: z.string(),
  restaurantName: z.string()
})

type SignFormProps = z.infer<typeof signupForm>

export function SignUp() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignFormProps>()
  const navigate = useNavigate()

  const { mutateAsync: createRestaurant } = useMutation({
    mutationFn: registerRestaurant
  })

  async function handleSignup(data: SignFormProps) {
    try {
      await createRestaurant({
        phone: data.phone,
        email: data.email,
        restaurantName: data.restaurantName,
        managerName: data.managerName
      })
      toast.success('Enviamos um link de autenticação no seu e-mail', {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`)
        }
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante')
    }

  }
  return (
    <>
      <Helmet title="Sign-up" />
      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-4 top-8">
          <Link to={"/sign-in"}> Fazer login</Link>
        </Button>

        <div className="w-[320px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl tracking-tight font-semibold">Criar conta grátis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
          </div>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input type="text" id="restaurantName" {...register('restaurantName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input type="text" id="managerName" {...register('managerName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input type="tel" id="phone" {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com o
              nossos <a className="underline underline-offset-4" href="#">
                termos de serviços
              </a>  e{' '}
              <a className="underline underline-offset-4" href="#">
                políticas de privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </>

  )
}
