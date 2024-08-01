import { React, useState } from "react";
import styles from "./home.module.css"
import Icon from '@mdi/react';
import { mdiPineTreeBox, mdiAccountCircle, mdiPlus, mdiTrashCanOutline, mdiFileEditOutline } from '@mdi/js'
import { Form } from "../form/form";
import { Modal } from "../Modal/modal";
import { ConfirmationModal } from "../delete/confirmationModal";


export function Home() {
    const [createModal, setCreateModal] = useState(false)
    const [readModal, setReadModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [option, setOption] = useState('')

    function deleteOption() {
        setConfirmationModal(true)
        setOption('delete')
    }

    function editOption() {
        setConfirmationModal(true)
        setOption('edit')
    }

    return (<>
        <header className={styles.header}>
            <div className={styles.box}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon path={mdiPineTreeBox} size={4} />
                    <h1 className={styles.h1}>Odyssey</h1>
                </div>
                <div className={styles.actions}>
                    <div className={styles.loginBox}>
                        <Icon path={mdiAccountCircle} size={1.5}></Icon>
                        <p style={{ margin: "0" }}>Gabriel</p>
                    </div>
                    <div className={styles.createBox}>
                        <div className={styles.mdiPlus} onClick={() => setCreateModal(true)}>
                            <Icon path={mdiPlus} size={1}></Icon>
                        </div>
                        <div className={styles.mdiTrashCanOutline} onClick={() => deleteOption()}>
                            <Icon path={mdiTrashCanOutline} size={1}></Icon>
                        </div>
                        <div className={styles.updateMdi}>
                            <Icon path={mdiFileEditOutline} onClick={() => editOption()} size={1}></Icon>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <Form createModal={createModal} setCreateModal={setCreateModal} selectedItem={selectedItem} option={option} setOption={setOption}> </Form>
        <Modal readModal={readModal} setReadModal={setReadModal}
        selectedItem={selectedItem} option={option}></Modal>
        <ConfirmationModal
            confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal}
            setSelectedItem={setSelectedItem} setReadModal={setReadModal}
            setCreateModal={setCreateModal} option={option}>
        </ConfirmationModal>
    </>)
}