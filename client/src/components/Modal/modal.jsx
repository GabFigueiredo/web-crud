import { React, useEffect }from "react";
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';

import styles from './modal.module.css'

export function Modal({modalStatus, setModalStatus, selectedItems}) {
    useEffect(() => {
        // console.log(selectedItems)
    }, [selectedItems])
    
    if (modalStatus) {
        return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <div className={styles.leftArticle}>
                    <img className={styles.img} src={`http://localhost:5000/files/${selectedItems.imageId}.jpg`} alt="Description" />
                </div>
                <div className={styles.rightArticle}>
                    <div style = {{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p style = {{color: "#3a3a3a", fontSize: "14px", margin: '0px'}}>id: {selectedItems._id}</p>
                        <Icon className={styles.Icon} path={mdiCloseThick} size={1} onClick={() => setModalStatus(false)}>FECHAR</Icon>
                    </div>
                    <div>
                        <h1 style={{fontSize: "50px", margin: "0px"}}>{selectedItems.nome}</h1>
                        <p style={{color: "#56cef6", margin: "0px"}}>{selectedItems.destino}</p>
                    </div>
                    <div className={styles.desc}>
                        <p style= {{lineHeight: "1.8"}}>{selectedItems.descricao}</p>
                    </div>
                    <div style={{display: "flex", gap: "15px"}}>
                        <p><span style={{color: "#56cef6", margin: "0px"}}>Preço: </span>{selectedItems.preco}</p>
                        <p><span style={{color: "#56cef6", margin: "0px"}}>Duração: </span>{selectedItems.duracao}</p>
                    </div>
                    <p style={{margin: "0"}}><span style={{color: "#56cef6", margin: "0px"}}>Disponibilidade: </span>{selectedItems.duracao} dias</p>
                </div>
            </div>
        </div>)
    } else {
        return (<></>)
    }
    
}