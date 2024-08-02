const fs = require('fs')
const path = require('path');
const pool = require('../../models/postgres')

function deletar(filename, id, idFromBody) {
    filename = filename + `/${id}.jpg`
    fs.unlink(filename, (err) => {
        if (err) {
            console.error(`Erro ao deletar o arquivo: ${err}`);
            throw err;
        }
        console.log('\x1b[31m Imagem foi excluída devido a cancelamento de operação! \x1b[0m')
    });
}

module.exports = async (req, res) => {
    const id = req.params.id.slice(0, -4);
    let client
    let idFromBody

    if (id) {
        client = await pool.connect()
        idFromBody = await client.query('SELECT image_id FROM Trips WHERE image_id = $1', [id])
        idFromBody.rows[0] ? idFromBody = idFromBody.rows[0].image_id : idFromBody = null
    }

    console.log("Esse é o id do body, da busca =  " + idFromBody)
    console.log('Esse é o id = ' + id)
    if (id !== idFromBody && id) {
        try {
            deletar(path.resolve(__dirname, '../uploads'), id, idFromBody);
            res.status(200).send(`Arquivo ${id} deletado com sucesso!`);
        } catch (err) {
            console.log(err)
            res.status(500).send(`Erro ao deletar o arquivo: ${err.message}`);
        }
        finally {
            if(client) client.release()
        }
    }else if (!id) {
        console.log('\x1b[33m item não foi deletado pois está vazio! \x1b[0m')
        res.status(200).send('item não foi deletado pois está vazio!')
        return
    }
    else {
        console.log('\x1b[33m Imagem não foi deletada porquê já se encontra no banco de dados.. \x1b[0m')
        res.status(200).send('Imagem não foi deletada porquê já se encontra no banco de dados..')
        return
    }

}