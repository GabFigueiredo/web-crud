import { React, useEffect, useState } from "react";
import styles from "./home.module.css"
import Icon from '@mdi/react';
import { mdiPineTreeBox, mdiMagnify, mdiAccountCircle, mdiPlus, mdiTrashCanOutline } from '@mdi/js'
import { Form } from "../form/form";
import { Delete } from "../delete/delete";

export function Home() {
    const [createModal, setCreateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

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
                    <div className={styles.createBox}>
                        <div className={styles.mdiPlus} onClick={() => setCreateModal(true)}>
                            <Icon path={mdiPlus} size={1}></Icon>
                        </div>
                        <div className={styles.mdiTrashCanOutline} onClick={() => setDeleteModal(true)}>
                            <Icon path={mdiTrashCanOutline} size={1}></Icon>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <nav className={styles.navbar}>
            <div className={styles.searchBox}>
                <Icon className={styles.icon} path={mdiMagnify} size={1.5}></Icon>

            </div>
        </nav>
        <Form createModal={createModal} setCreateModal={setCreateModal}> </Form>
        <Delete deleteModal={deleteModal} setDeleteModal={setDeleteModal}></Delete>
    </>)
}

