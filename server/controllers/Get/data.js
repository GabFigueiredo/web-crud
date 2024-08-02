const pool = require('../../models/postgres')

module.exports = async (req, res) => {
    let client
    try {
        client = await pool.connect()
        const items = await client.query('SELECT * FROM Trips')
        res.status(200).json(items.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (client) client.release()
    }
}
