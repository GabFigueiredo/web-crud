import React from "react"
import { useState } from "react"
import axios from "axios"
import styles from './form.module.css'

export function Form({createModal, setCreateModal}) {
    const [name, setName] = useState()
    const [destiny, setDestiny] = useState()
    const [during, setDuring] = useState()
    const [desc, setDesc] = useState()
    const [price, setPrice] = useState()
    const [date, setDate] = useState([])

    const data = {
        nome: name,
        destino: destiny,
        duracao: during,
        descricao: desc,
        preco: price,
        datas_disponiveis: date
    }

    async function sendData() {
        try {
            await axios.post("http://localhost:5000/post", data)
            .then(res => console.log(res))
        } catch(error) {
            console.log('deu erroooo', error)
        }
    }
    
    if (createModal) {
        return (
            <div className={styles.background}>
                <div className={styles.modal}>
                    <input type="text" name="name" placeholder="John" onChange={(event) => setName(event.target.value)}></input> 
                    <input type="text" name="destino" placeholder="Grécia" onChange={(event) => setDestiny(event.target.value)}></input> 
                    <input type="number" name="duração" placeholder="12 dias" onChange={(event) => setDuring(event.target.value)}></input> 
                    <input type="text" name="desc" placeholder="Embarque em uma jornada" onChange={(event) => setDesc(event.target.value)}></input> 
                    <input type="number" name="preço" placeholder="$4500 por pessoa" onChange={(event) => setPrice(event.target.value)}></input> 
                    <input type="text" name="data" placeholder="Maio, Setembro" onChange={(event) => setDate(event.target.value.split(', '))}></input>
                    <button onClick={sendData} >AAAAA</button>
                </div>
            </div>
        )
    }
}