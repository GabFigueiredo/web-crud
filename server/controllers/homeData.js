const pool = require('../models/postgres')

module.exports = async (req, res) => {
    try {
        pool.connect()
        const items = await pool.query('SELECT * FROM Trips')
        res.status(200).json(items.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
