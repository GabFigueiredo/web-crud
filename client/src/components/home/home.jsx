import { React, useState, useEffect } from "react";
import styles from "./home.module.css"
import Icon from '@mdi/react';
import { mdiPineTreeBox, mdiBookOpenPageVariantOutline, mdiPlus, mdiTrashCanOutline, mdiFileEditOutline } from '@mdi/js'
import { Form } from "../form/form";
import { Modal } from "../Modal/modal";
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios'

export function Home({selectedRows}) {
    const [createModal, setCreateModal] = useState(false)
    const [readModal, setReadModal] = useState(false)
    const [selectedID, setSelectedID] = useState('')
    const [option, setOption] = useState('')
    const [selectedItem, setSelectedItem] = useState({})

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    useEffect(() => {
        if (selectedRows.length === 1) {
            const getItem = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/getUpdate/${selectedRows[0]}`)
                    setSelectedItem(response.data.data.rows[0])
                } catch (error) {
                    
                }
            }
            getItem()
        }
    }, [selectedRows])

    function isOnlyItem(selectedRows) {
        if (selectedRows.length > 1) {
            setOpen(true)
            setVariant('error')
            setMessage('Selecione apenas um item')
            return false
        } else if (selectedRows.length < 1) {
            setOpen(true)
            setVariant('warning')
            setMessage('Selecione pelo menos um item')
            return false
        } else {
            return true
        }
    }
        

    function editOption() {
        const answer = isOnlyItem(selectedRows)
        if (answer) {
            setOpen(false)
            setSelectedID(selectedRows[0])
            setCreateModal(true)
            setOption('edit')
        }   
    }

    function readOption(deleteOption) {
        const answer = isOnlyItem(selectedRows)
        if (answer) {
            setOpen(false)
            setSelectedID(selectedRows[0])
            if (deleteOption) {
                setOption('delete')
            }
            setReadModal(true)
        } 
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
          }

          setOpen(false);
    }

    return (<>
            <header className={styles.header}>
                <div className="Group">
                    <div className={styles.logoBox}>
                        <div style={{display: 'flex', marginLeft: '25px'}}>
                            <Icon path={mdiPineTreeBox} size={1.8} />
                            <h1 className={styles.h1}>Odyssey</h1>
                        </div>
                        <div className={styles.borderGradient}></div>
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.mdiPlus} onClick={() => setCreateModal(true)}>
                            <Icon path={mdiPlus} size={1.3}></Icon>
                            <p style={{fontSize: '21px', margin: '0'}}>Create</p>
                        </div>
                        <div onClick={() => readOption(false)} className={styles.updateMdi}>
                            <Icon path={mdiBookOpenPageVariantOutline} size={1.3}></Icon>
                            <p style={{fontSize: '21px', margin: '0'}}>Read</p>
                        </div>
                        <div onClick={() => editOption()} className={styles.updateMdi}>
                            <Icon path={mdiFileEditOutline} size={1.3}></Icon>
                            <p style={{fontSize: '21px', margin: '0'}}>Update</p>
                        </div>
                        <div className={styles.mdiTrashCanOutline} onClick={() => readOption(true)}>
                            <Icon path={mdiTrashCanOutline} size={1.3}></Icon>
                            <p style={{fontSize: '21px', margin: '0'}}>Delete</p>
                        </div>
                    </div>
                </div>
                <div style={{marginBottom: '70px'}}className="Group">
                    <div className={styles.borderGradient}></div>
                    <div className={styles.logoBox}>
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '25px', marginTop: '15px'}}>
                        <Avatar sx={{ width: 50, height: 50 }} src='http://localhost:5000/files/Gabriel.jpeg'></Avatar>
                        <div>
                            <p style={{fontSize: '22px', color: '#757575', marginLeft: '10px', marginTop: '0', marginBottom: '0', fontWeight: '700'}}>Gabriel</p>
                            <p style={{fontSize: '22px', color: '#B3B3B3', marginLeft: '10px', marginTop: '0', marginBottom: '0'}}>Entusiasta</p>
                        </div>
                    </div>
                </div>
                </div>
            </header>

            <Form createModal={createModal} setCreateModal={setCreateModal} selectedItem={selectedItem} option={option} setOption={setOption}> </Form>
            <Modal readModal={readModal} setReadModal={setReadModal}
            selectedID={selectedID} option={option}></Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity={variant}
                variant="filled"
                sx={{ width: '100%' }}
                >
                {message}
                </Alert>
            </Snackbar>
    </>)
}