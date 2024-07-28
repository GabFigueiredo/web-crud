const itemsModel = require('../models/homeModel')
const pool = require('../models/postgres')

module.exports = async (req, res) => {
  const query = 'UPDATE Trips SET nome = $1, destino = $2, duracao = $3, preco = $4, datas_disponiveis = $5, image_id = $6 WHERE id = $7 VALUES ($1, $2, $3, $4, $5, $6, $7)'
  const itemID = req.params.id
  const {nome, destino, duracao, preco, datas_disponiveis, imageId } = req.body

  try {
    if (!req.body.nome) {
      return res.status(404).send("Falhou pois req.body está vazio")
    }
    await pool.connect()
    await pool.query(query, [nome, destino, duracao, preco, datas_disponiveis, imageId, itemID])
    await pool.end()
    res.send("De alguma forma deu pra alterar o item")
    console.log("Request feito")
  } catch (err) {
    res.status(400).json({
      message: "Não foi possível editar o item",
      data: err})
  }
}
