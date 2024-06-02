import {React, useState} from "react";
import axios from "axios";
import styles from './delete.module.css'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // cor da borda padrão
      },
      '&:hover fieldset': {
        borderColor: 'white', // cor da borda quando em hover
      },

      '&.Mui-focused fieldset': {
        borderColor: '#56cef6', // cor da borda quando focado
      },
    },
    '& .MuiInputBase-input': {
      color: 'white', // cor do texto digitado
    },
    '& .MuiInputLabel-root': {
      color: 'white', // cor do label padrão
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#56cef6', // cor do label quando focado
    },
  });


export function Delete({deleteModal, setDeleteModal}) {
    const [itemID, setItemID] = useState('')

    async function deleteItem() {
        try {
            const res = await axios.delete(`http://localhost:5000/delete/${itemID}`)
            console.log(res)
        } catch (err) {
            console.error('Erro ao enviar o pedido', err)
        }
    }
    
    if (deleteModal) {
        return (
        <div className={styles.background} onClick={() => setDeleteModal(false)}>
            <div className={styles.modal}>
                <div>
                    <h1>Deletar item por ID</h1>
                </div>
                <div> 
                    <CustomTextField
                    id="outlined-ID"
                    label="ID do item"
                    value={itemID}
                    variant="outlined"
                    onChange={(event) => setItemID(event.target.value)}
                    />
                </div>
                <Button
                    onClick={deleteItem}
                    variant="outlined"
                    size="large"
                    sx={{
                        borderColor: 'gray',
                        color: 'gray',
                        marginTop: "10px",
                        '&:hover': {
                            borderColor: 'red',
                            color: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)', 
                        }
                    }}
                    >
                    Deletar
                </Button>
            </div>
        </div>)
    } else {
        return (<></>)
    }
    
}