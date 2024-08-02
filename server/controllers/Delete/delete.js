const pool = require('../../models/postgres')

module.exports = async (req, res) => {
    const id = req.params.id
    let client
    
    try {
        client = await pool.connect()
        await client.query('DELETE FROM Trips WHERE id = $1', [id])
        res.status(200).send("Item excluído com sucesso")
    } catch (err) {
        res.status(400).json({
            message: "Erro ao tentar apagar do banco de dados",
            data: err,
        })
    } finally {
        if (client) client.release()
    }
}

