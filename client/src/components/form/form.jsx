import React from "react"
import { useState } from "react"
import axios from "axios"
import styles from './form.module.css'
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import modal from '../Modal/modal.module.css'

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

export function Form({ createModal, setCreateModal }) {
    const [name, setName] = useState('')
    const [destiny, setDestiny] = useState('')
    const [during, setDuring] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState([])
    const [imagePath, setImagePath] = useState('')

    const data = {
        nome: name,
        destino: destiny,
        duracao: during,
        descricao: desc,
        preco: price,
        datas_disponiveis: date,
        imageId: imagePath
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

            setImagePath(`${res.data.file.filename}`)

        } catch (err) {
            console.error('Erro ao enviar a imagem: ', err);
        }
    }

    async function sendData() {
        try {
            await axios.post("http://localhost:5000/post", data)
                .then(res => console.log(res))
        } catch (error) {
            console.log('deu erroooo', error)
        }
    }

    if (createModal) {
        return (
            <div className={styles.background}>
                <div className={styles.modal}>
                    <div className={styles.formSide}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <CustomTextField
                                    id="outlined-Nome"
                                    label="Nome"
                                    value={name}
                                    variant="outlined"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div>
                                <CustomTextField
                                    id="outlined-Destino"
                                    label="Destino"
                                    variant="outlined"
                                    onChange={(event) => setDestiny(event.target.value)}
                                />
                            </div>
                            <div>
                                <CustomTextField
                                    id="outlined-Descrição"
                                    label="Duração em dias"
                                    type="number"
                                    variant="outlined"
                                    inputProps={{ min: 1, max: 20 }}
                                    onChange={(event) => setDuring(event.target.value)}
                                />
                            </div>
                            <div>
                                <CustomTextField
                                    id="outlined-Descrição"
                                    label="Descrição"
                                    variant="outlined"
                                    onChange={(event) => setDesc(event.target.value)}
                                />
                            </div>
                            <div>
                                <CustomTextField
                                    id="outlined-Descrição"
                                    label="Preço"
                                    type="number"
                                    variant="outlined"
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                            <div>
                                <CustomTextField
                                    id="outlined-Disponibilidade"
                                    label="Disponibilidade"
                                    variant="outlined"
                                    onChange={(event) => setDate(event.target.value.split(', '))}
                                />
                            </div>
                            <div>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    onChange={(event) => handleImage(event)}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Button onClick={sendData} variant="outlined">Criar</Button>
                        </div>
                    </div>
                    <div className={styles.previewSide}>
                        <div className={modal.leftArticle}>
                            <img className={styles.img} src={imagePath === "" ? `http://localhost:5000/files/blue-green-fade.jpg` : imagePath} alt="Description" />
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
        )
    }
}
