import {React, useState, useEffect} from "react";
import { Modal } from "../Modal/modal";
import styles from "../home/home.module.css"
import axios from 'axios'

export function Table() {
    const [items, setItems] = useState([])
    const [readModal, setReadModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState({})

    function titleClick(item) {
        setReadModal(true)
        setSelectedItems(item)
    }

    useEffect(() => {
        async function axiosGet() {
           try {
               const response = await axios.get('http://localhost:5000/data')
               setItems(response.data)
           } catch(error) {
                console.error("Erro ao fazer a busca de dados", (error))
            }  
        }
        axiosGet()
   }, [])
    
    return (<>
        <div className={styles.center}>
            <main className={styles.main}>
                <div className={styles.category}>
                     <div className={styles.trip}>
                        <p className={styles.pCategory}>Viagem</p>
                     </div>
                     <div className={styles.duration}>
                        <p className={styles.pCategory}>Duração</p>
                     </div>
                     <div>
                     <p className={styles.pCategory}>Disponibilidade</p>
                     </div>
                </div>
                <ul className={styles.ul}>
                    {items.map((item, index) => {
                        return <li className={styles.li}key={index}>
                                    <div className={styles.destiny}>
                                        <h3 className={styles.h3} onClick={() => titleClick(item)}>{item.nome}</h3>
                                        <p className={styles.pDestiny}>{item.destino}</p>
                                    </div>
                                    <div>
                                        <p className={styles.pDestiny}>{item.duracao} Dias</p>
                                    </div>
                                    <div>
                                        <p className={styles.pDestiny}>{item.datas_disponiveis.join(', ')}</p>
                                    </div>
                                </li>
                    })}
                </ul>
            </main>
        </div>
        <Modal modalStatus={readModal} setModalStatus={setReadModal} selectedItems={selectedItems}></Modal>
    </>    
    )
}