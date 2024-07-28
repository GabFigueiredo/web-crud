const pool = require('../models/postgres')

module.exports = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    await pool.connect()
    const response = await pool.query(`SELECT * FROM Trips WHERE id = $1`, [id])
    await pool.end()
    res.status(200).json({
      message: "Item encontrado com sucesso!",
      data: response
    })
  } catch (err) {
    res.status(400).json({
      message: "Erro ao tentar encontrar o item",
      data: err,
    })
  }
}
