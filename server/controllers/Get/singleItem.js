const pool = require('../../models/postgres')

module.exports = async (req, res) => {
  const id = req.params.id
  let client
  try {
    client = await pool.connect()
    const response = await client.query(`SELECT * FROM Trips WHERE id = $1`, [id])
    res.status(200).json({
      message: "Item encontrado com sucesso!",
      data: response
    })
    console.log("\x1b[34m Busca de item único foi feita \x1b[0m")
  } catch (err) {
    res.status(400).json({
      message: "Erro ao tentar encontrar o item",
      error: err,
    })
  } finally {
      if (client) client.release()
  }
}
