import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Table from 'src/components/Table/Table';
import useRememberTable from 'src/hooks/useRememberTable';
import { useGetAllPokemonQuery } from 'src/services/pokemon';

export default function ListPokemon() {
  const {paginationModel, setPaginationModel} = useRememberTable()
  const [rows, setRows] = useState<GridRowsProp>([])
  const [columns, setColumns] = useState<GridColDef[]>([])
  const { 
    data, 
    error, 
    isLoading, 
    refetch, 
    isFetching, 
    isSuccess 
  } = useGetAllPokemonQuery(paginationModel);
  
  useEffect(()=> {
    if(isSuccess && data){
      setColumns([
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'name', width: 90 },
      ]);  
      setRows(
        data.results.map((e: any)=>{
          console.log(e.url.split('/')[e.url.split('/').length -2])
          return {...e, id: e.url.split('/')[e.url.split('/').length -2]} // mock api not returning ID so making one
        })
      )
    }
  },[data])
  
  return (
    <div>
        <Table 
          rows={rows} 
          columns={columns} 
          pageSizeOptions={[5,10,20]} 
          loading={isLoading} 
          refetch={refetch} 
          isFetching={isFetching}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          totalRows={data?.count ?? 0}
        />
    </div>
  )
}
