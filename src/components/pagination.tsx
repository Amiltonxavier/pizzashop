
type PaginationProps = {
    pageIndex: number;
    totalCount: number;
    perPage: number;
}

export function Pagination({ pageIndex, totalCount, perPage }: PaginationProps) {
    const pages = Math.ceil(totalCount / perPage) || 1
    return (
        <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Total de {totalCount} de iten(s)</span>

            <div className='flex '>
                <div className='text-sm font-medium'>
                    Página  {pageIndex + 1} de {pages}
                </div>
            </div>
        </div>
    )
}
