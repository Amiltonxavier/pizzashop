import { DialogContent, DialogHeader, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead, TableFooter } from '@/components/ui/table'

export default function OrdersDetails() {
  return (
    <DialogContent>
    <DialogHeader>
        <DialogTitle>Pedido: 540h7594df3</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
    </DialogHeader>
    <div className='space-y-6'>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className='text-muted-foreground'>Estado</TableCell>
                    <TableCell className='flex justify-end'>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full size-2 bg-slate-400" />
                            <span className="font-medium text-muted-foreground">Pendente</span>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='text-muted-foreground'>Cliente</TableCell>
                    <TableCell className='flex justify-end'>
                        Amilton Xavier
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='text-muted-foreground'>Telefone</TableCell>
                    <TableCell className='flex justify-end'>
                        (+244) 999-999-999
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='text-muted-foreground'>E-mail</TableCell>
                    <TableCell className='flex justify-end'>
                        amiltonxavier1999@gmail.com
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='text-muted-foreground'>Realizado há</TableCell>
                    <TableCell className='flex justify-end'>
                        há 15 min
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className='text-right'>Qtd</TableHead>
                    <TableHead className='text-right'>Preço</TableHead>
                    <TableHead className='text-right'>Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Mega Pizza de Frango e queixo</TableCell>
                    <TableCell className='text-right'>2</TableCell>
                    <TableCell>7,000 kz</TableCell>
                    <TableCell>14,000 kz</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mega Pizza de Frango</TableCell>
                    <TableCell className='text-right'>1</TableCell>
                    <TableCell>5,000 kz</TableCell>
                    <TableCell>5,000 kz</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell>19,000 kz</TableCell>
            </TableFooter>
        </Table>
    </div>
</DialogContent>
  )
}
