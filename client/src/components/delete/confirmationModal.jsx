import { React, useState } from "react";
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
    '& ..Mui-focused': {
        color: '#56cef6', // cor do label quando focado
    },
});

export function ConfirmationModal({ confirmationModal, setConfirmationModal, setSelectedItem, setReadModal, setCreateModal, option}) {
    const [itemID, setItemID] = useState('')

    async function searchSingleItem() {
        try {
            const res = await axios.get(`http://localhost:5000/getUpdate/${itemID}`)
            setSelectedItem(res.data.data.rows[0])
        } catch(error) {
            console.log('Aconteceu um erro no cliente', error)
        }
        setConfirmationModal(false)

        if (option === 'delete') {
            setReadModal(true)
        } else if (option === 'edit') {
            setCreateModal(true)
        }
    }

    if (confirmationModal) {
        return (
            <>
            <div onClick= {() => setConfirmationModal(false)} className={styles.background}>
                <div onClick= {(e) => e.stopPropagation()} className={styles.modal}>
                    <div>
                        <h1 style={{ marginTop: '0px' }}>Visualizar o item por id</h1>
                    </div>
                    <div>
                        <CustomTextField
                            id="outlined-ID"
                            label="ID do item"
                            value={itemID}
                            variant="outlined"
                            onChange={(event) => setItemID(event.target.value)}
                            sx = {{width: '100%'}}
                        />
                    </div>
                    <Button
                        onClick={() => searchSingleItem()}
                        variant="outlined"
                        size="large"
                        sx={{
                            borderColor: 'gray',
                            color: 'success',
                            marginTop: "10px",
                        }}
                    > Visualizar item
                    </Button>
                </div>
            </div>
            </>)
    }
}
