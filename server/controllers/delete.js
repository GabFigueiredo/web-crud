const pool = require('../models/postgres')

module.exports = async (req, res) => {
    const id = req.params.id
    
    try {
        await pool.connect()
        await pool.query('DELETE FROM Trips WHERE id = $1', id)
        await pool.end()
        res.status(200).send("Item excluído com sucesso")
    } catch (err) {
        res.status(400).json({
            message: "Erro ao tentar apagar do banco de dados",
            data: err,
        })
    }
}

