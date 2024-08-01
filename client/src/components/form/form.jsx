import React from "react"
import { useState, useEffect, } from "react"
import axios from "axios"
import styles from './form.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import modal from '../Modal/modal.module.css'
import { SnackbarProvider, useSnackbar } from 'notistack';

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export function Form({ createModal, setCreateModal, selectedItem, option, setOption }) {
    const [name, setName] = useState(selectedItem.nome || '')
    const [destiny, setDestiny] = useState(selectedItem.destino || '')
    const [during, setDuring] = useState(selectedItem.duracao || '')
    const [desc, setDesc] = useState(selectedItem.descricao || '')
    const [price, setPrice] = useState(selectedItem.preco || '')
    const [date, setDate] = useState(selectedItem.datas_disponiveis || '')
    const [imagePath, setImagePath] = useState(selectedItem.image_id ||'')

    useEffect(() => {
        setName(selectedItem.nome)
        setDestiny(selectedItem.destino)
        setDuring(selectedItem.duracao)
        setDesc(selectedItem.descricao)
        setPrice(selectedItem.preco)
        setDate(selectedItem.datas_disponiveis)
        setImagePath(selectedItem.image_id)
    }, [selectedItem])

    const data = {
        nome: name,
        destino: destiny,
        duracao: during,
        descricao: desc,
        preco: price,
        datas_disponiveis: date,
        imageId: imagePath,
        itemOriginal: selectedItem
    }

    function closeModal() {
        setName('')
        setDestiny('')
        setDuring('')
        setDesc('')
        setPrice('')
        setDate('')
        setImagePath('')
        setCreateModal(false)
        setOption('')
        deleteImage()
    }
    
    async function deleteImage() {
        if (imagePath) {
            try {
                await axios.delete(`http://localhost:5000/deleteImage/${imagePath}.jpg`)
            } catch (error) {
                console.log('Erro ao deletar imagem', error)
            }
        }
    }

    async function handleImage(event) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const filename = res.data.file.filename
            
            setImagePath(filename.slice(0, -4))

        } catch (err) {
            console.error('Erro ao enviar a imagem: ', err);
        }
    }

    async function updateItem() {
        try {
            axios.put(`http://localhost:5000/update/${selectedItem.id}`, data)
            setCreateModal(false)
        } catch(error) {
            console.log('Erro ao editar item', error)
        }
    }

    async function sendData() {
        try {
            await axios.post("http://localhost:5000/post", data)
            return ["Item adicionado com sucesso!", "success"]
        } catch (error) {
            return ["Não foi possível adicionar o item!", "error"]
        }
    }

    const CreateButton = () =>  {
        const { enqueueSnackbar } = useSnackbar()

        if (option != 'edit') {
            return (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px'}}>
                <Button
                    onClick={() => {
                        sendData().then( ([message, variant]) => {
                            enqueueSnackbar(message, {variant: variant});
                        });
                    }}
                    variant="outlined"
                    size="large"
                    color='success'
                > Criar item
                </Button>
                </div>
            )
        } 
    }

    if (createModal) {
        return (
            <SnackbarProvider>
            <div className={styles.background}>
                <div style={{width: '100%', height: '100%', zIndex: '1'}} onClick={() => closeModal()}></div>
                <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}className="side">
                        <div className={styles.formSide}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Nome"
                                        label= 'Nome'
                                        value = {name}
                                        variant="outlined"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Destino"
                                        label= 'Destino'
                                        value = {destiny}
                                        variant="outlined"
                                        onChange={(event) => setDestiny(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Descrição"
                                        label= 'Duração em dias'
                                        type="number"
                                        variant="outlined"
                                        inputProps={{ min: 1, max: 20 }}
                                        onChange={(event) => setDuring(event.target.value)}
                                        sx={{width: '100%'}}
                                    />
                                </div>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Descrição"
                                        label= 'Descrição'
                                        value = {desc}
                                        variant="outlined"
                                        onChange={(event) => setDesc(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Descrição"
                                        label="Preço"
                                        type="number"
                                        variant="outlined"
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <CustomTextField required
                                        id="outlined-Disponibilidade"
                                        label= 'Disponibilidade'
                                        value = {date}
                                        variant="outlined"
                                        onChange={(event) => setDate(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        onChange={(event) => handleImage(event)}
                                    > Upload file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {option === 'edit' && (
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px'}}>
                                <Button
                                    onClick={() => updateItem()}
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    color='success'
                                > Editar item
                                </Button>
                            </div>
                        )}
                        <CreateButton />
                    </div>
                    <div className={styles.previewSide}>
                        <div className={modal.leftArticle}>
                            <img className={styles.img} src={!imagePath ? `http://localhost:5000/files/blue-green-fade.jpg` : `http://localhost:5000/files/${imagePath}.jpg`} alt="Description" />
                        </div>
                        <div className={modal.rightArticle}>
                            <div>
                                <div className={modal.nameContainer}>
                                    <h1 style={{ fontSize: "50px", margin: "0px" }}>{name}</h1>
                                    <p style={{ color: "#56cef6", margin: "0px" }}>{destiny}</p>
                                </div>
                            </div>
                            <div className={modal.desc}>
                                <p style={{ lineHeight: "1.8" }}>{desc}</p>
                            </div>
                            <div style={{ display: "flex", gap: "15px" }}>
                                <p><span style={{ color: "#56cef6", margin: "0px" }}>Preço: </span>R${price}</p>
                                <p><span style={{ color: "#56cef6", margin: "0px" }}>Duração: </span>{during} dias</p>
                            </div>
                            <p style={{ margin: "0" }}><span style={{ color: "#56cef6", margin: "0px" }}>Disponibilidade: </span>{date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
        )
    }
}
