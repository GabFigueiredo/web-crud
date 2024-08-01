import { React, useState } from "react";
import modalStyle from '../delete/delete.module.css'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

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


export function Update({ updateModal, setUpdateModal, setCreateModal, setItemsFromUpdate }) {
    const [itemID, setItemID] = useState('')
    async function searchSingleItem() {
        try {
            const res = await axios.get(`http://localhost:5000/getUpdate/${itemID}`)
            setItemsFromUpdate(res.data.data.rows[0])
        } catch(error) {
            console.log('Aconteceu um erro no cliente', error)
        }
    }
    
    async function handleClickItem() {
        setUpdateModal(false)
        setCreateModal(true)
        searchSingleItem()
    }

    if (updateModal) {
        return (
            <div onClick={() => setUpdateModal(false)} className={modalStyle.background}>
                <div style={{width: '100%', height: '100%', zIndex: '1'}}onClick={() => setUpdateModal(false)}></div>
                <div onClick={(e) => e.stopPropagation()} className={modalStyle.modal}>
                    <div>
                        <h1 style={{ marginTop: '0px' }}>Editar item por ID</h1>
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
                        onClick={() => handleClickItem()}
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
                        Editar
                    </Button>
                </div>
            </div>)
    }

}
