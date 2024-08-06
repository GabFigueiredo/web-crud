import { React, useEffect, useState }from "react";
import axios from 'axios'

import styles from './modal.module.css'

import Button from '@mui/material/Button';

export function Modal({readModal, setReadModal, selectedID, option}) {
    const [item, setItems] = useState({})

    useEffect(() => {
        const getItem = async () => {
            if (selectedID) {
                try {
                    const response = await axios.get(`http://localhost:5000/getUpdate/${selectedID}`)
                    console.log(response)
                    setItems(response.data.data.rows[0])
                } catch (error) {   
                    console.log(error)
                }
            }
        }
        getItem()
    }, [selectedID])


    async function deleteItem() {
        try {
            axios.delete(`http://localhost:5000/delete/${selectedID}`)
        } catch(error) {
            console.log('Erro ao deletar item', error)
        }
    }
    
    if (readModal) {
        return (
        <div onClick = {() => setReadModal(false)} className={styles.background}>
                <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                    <div className={styles.leftArticle}>
                        <img className={styles.img} src={`http://localhost:5000/files/${encodeURIComponent(item.image_id)}.jpg`} alt="Description"/>
                    </div>
                    <div className={styles.rightArticle}>
                        <div style = {{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p style = {{color: "#3a3a3a", fontSize: "14px", margin: '0px'}}>id: {item.id}</p>
                        </div>
                        <div>
                            <h1 style={{fontSize: "50px", margin: "0px"}}>{item.nome}</h1>
                            <p style={{color: "#56cef6", margin: "0px"}}>{item.destino}</p>
                        </div>
                        <div className={styles.desc}>
                            <p style= {{lineHeight: "1.8"}}>{item.descricao}</p>
                        </div>
                        <div style={{display: "flex", gap: "15px"}}>
                            <p><span style={{color: "#56cef6", margin: "0px"}}>Preço: </span>{item.preco}</p>
                            <p><span style={{color: "#56cef6", margin: "0px"}}>Duração: </span>{item.duracao}</p>
                        </div>
                        <p style={{margin: "0"}}><span style={{color: "#56cef6", margin: "0px"}}>Disponibilidade: </span>{item.duracao} dias</p>
                    </div>
                </div>
                {option === 'delete' && (
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px'}}>
                        <Button
                            onClick={() => deleteItem()}
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
                        > Excluir item
                        </Button>
                    </div>
                    )}
        </div>)
    }
}