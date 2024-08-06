import {React, useState, useEffect} from "react";
import styles from "../home/home.module.css"
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', headerName: 'Viagem', width: 250 },
    { field: 'destino', headerName: 'Destino', width: 170 },
    { field: 'descricao', headerName: 'Descrição', width: 180, },
    { field: 'duracao', type: 'number', headerName: 'Duração', width: 150, },
    { field: 'preco', type: 'number', headerName: 'Preço', width: 150, },
  ];

export function Table({ setSelectedRows }) {
    const [items, setItems] = useState([])

    const onRowSelectionModelChange = (selectedRow) => setSelectedRows(selectedRow)

    useEffect(() => {
        async function axiosGet() {
            try {
               const response = await axios.get('http://localhost:5000/data')
               setItems(response.data)
               console.log(response.data)
           } catch(error) {
                console.error("Erro ao fazer a busca de dados", (error))
            }  
        }
        axiosGet()
   }, [])
    
    return (<>
        <div className={styles.center}>
            <main className={styles.main}>
                <DataGrid sx={{
                    color: 'white',
                    border: 'solid 2px #2E2E2E',
                    backgroundColor: '',
                    '--DataGrid-containerBackground': '#252525',
                    '--DataGrid-rowBorderColor':'#252525',
                    '.MuiButtonBase-root': {
                        color: 'white',
                        
                    },

                    '.MuiButtonBase-root, .MuiDataGrid-withBorderColor': {
                        borderColor: '#252525'
                    },

                    '.MuiTablePagination-root': {
                        color: 'white'
                    }
                }}
                    rows={items}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 11 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={onRowSelectionModelChange}
                />
            </main>
        </div>
    </>
    )
}