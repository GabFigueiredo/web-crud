import React from "react"
import { useState } from "react"
import axios from "axios"

export function Form() {
    const [name, setName] = useState()
    const [destiny, setDestiny] = useState()
    const [during, setDuring] = useState()
    const [desc, setDesc] = useState()
    const [price, setPrice] = useState()
    const [date, setDate] = useState()

    const data = {
        nome: name,
        destino: destiny,
        duracao: during,
        descricao: desc,
        preco: price,
        datas_disponiveis: function() {
            return date.split(', ')
        }
    }

    async function sendData() {
        try {
            await axios.post("http://localhost:5000/post", data)
        } catch(error) {
            console.log('deu erroooo', error)
        }
    }
    
    return (
        <>
           <input type="text" placeholder="John" onChange={(event) => setName(event.target.value)}></input> 
           <input type="text" placeholder="Grécia" onChange={(event) => setDestiny(event.target.value)}></input> 
           <input type="text" placeholder="12 dias" onChange={(event) => setDuring(event.target.value)}></input> 
           <input type="text" placeholder="Embarque em uma jornada" onChange={(event) => setDesc(event.target.value)}></input> 
           <input type="text" placeholder="$4500 por pessoa" onChange={(event) => setPrice(event.target.value)}></input> 
           <input type="text" placeholder="Maio, Setembro" onChange={(event) => setDate(event.target.value)}></input>
           <button onClick={sendData} >AAAAA</button>
        </>
    )
}