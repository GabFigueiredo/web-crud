import { React, useEffect, useState } from "react";
import styles from "./home.module.css"
import Icon from '@mdi/react';
import { mdiPineTreeBox, mdiMagnify, mdiAccountCircle, mdiPlus } from '@mdi/js'
import axios from 'axios'
import { Modal } from "../Modal/modal";
import { Form } from "../form/form";

export function Home() {
    const [items, setItems] = useState([])
    const [readModal, setReadModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
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
                // console.log('Busca de dados obteve êxito!')
            } catch(error) {
                // console.log('Busca de dados não obtevo êxito ;(', error)
             }
         }
         axiosGet()
    }, [])

    useEffect(() => {
        // console.log(items)
    },[items])
    
    useEffect(() => {
        // console.log(readModal)
    },[readModal])

    useEffect(() => {
        // console.log(createModal)
    },[createModal])

    return(<>
        <header className={styles.header}>
            <div className={styles.box}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Icon path={mdiPineTreeBox} size={4}/>
                    <h1 className={styles.h1}>Odyssey</h1>
                </div>
                <div className={styles.actions}>
                    <div className={styles.loginBox}>
                        <Icon path={mdiAccountCircle} size={1.5}></Icon>
                        <p style={{margin: "0"}}>Gabriel</p>
                    </div>
                    <div className={styles.createBox} onClick={() => setCreateModal(true)}>
                        <Icon path={mdiPlus} size={1}></Icon>
                    </div>
                </div>
            </div>
        </header>
        <nav className={styles.navbar}>
            <div className={styles.searchBox}>
                <Icon className={styles.icon} path={mdiMagnify} size={1.5}></Icon>
            </div>
        </nav>
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
        <Form createModal={createModal} setCreateModal={setCreateModal}> </Form>
    </>)
}

