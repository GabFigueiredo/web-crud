const pool = require('../models/postgres')

module.exports = async (req, res) => {
    try {
        await pool.connect()
        const items = await pool.query('SELECT * FROM Trips')
        await pool.end()
        console.log('GET FOI CHAMADO')
        res.json(items)
    } catch (error) {
        console.log('Não deu')
        res.status(500).json({ error: error.message })
    }
}   
