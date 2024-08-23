
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getManagedRestaurant, getManagedRestaurantProps } from '@/api/get-restaurant'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'
import { Spinner } from './spinner'
import { getProfileProps } from '@/api/get-profile'


const storeProfileSchema = z.object({
    name: z.string().min(3),
    description: z.string().nullable()
})

type storeProfileProps = z.infer<typeof storeProfileSchema>


export default function StoreProfileDialog() {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryFn: getManagedRestaurant,
        queryKey: ['managed-restaurant'],
        staleTime: 1000
    })

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<storeProfileProps>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: data?.name ?? '',
            description: data?.description ?? ''
        }
    })
    function updateManagedRestaurantCached( {name, description}: storeProfileProps ) {
        const cashed = queryClient.getQueryData<getManagedRestaurantProps>(['managed-restaurant'])
        if (cashed) {
            queryClient.setQueryData(['managed-restaurant'], {
                ...cashed,
                name,
                description
            })
        }
        return { cashed }
    }

    const { mutateAsync: update } = useMutation({
        mutationFn: updateProfile,
        onMutate({ name, description }) {
            const { cashed } = updateManagedRestaurantCached({ name, description })
            return { previous: cashed }
        },
        onError(_, __, context){
            if(context?.previous){
                updateManagedRestaurantCached(context.previous)
            }
        }
    })

    async function updateRegisterStroge(data: storeProfileProps) {
        const { name, description } = data;
        try {
            await update({ name, description })
            toast.success('Dados da loja atualizado')
        } catch {
            toast.error('Erro ao atualizar os dados da loja')
        }

    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil de loja</DialogTitle>
                <DialogDescription>Atualize  as informações do seu estabelecimento visíveis ao seu cliente</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(updateRegisterStroge)}>
                <div className='space-y-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='name'>Nome</Label>
                        <Input className='col-span-3' id='name' {...register('name')} />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='description'>Descrição</Label>
                        <Textarea className='col-span-3' id='description' {...register('description')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type='button' variant={'ghost'}>Cancelar</Button>
                    </DialogClose>
                    <Button type='submit' variant={'success'} disabled={isSubmitting}>
                        {
                            isSubmitting ?
                                <Spinner /> : <span>Salvar</span>
                        }

                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
