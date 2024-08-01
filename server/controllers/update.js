const pool = require('../models/postgres')

module.exports = async (req, res) => {
  const query = 'UPDATE Trips SET nome = $1, destino = $2, duracao = $3, descricao = $4, preco = $5, datas_disponiveis = $6, image_id = $7 WHERE id = $8'
  const itemID = req.params.id
  console.log(req.body.itemOriginal)
  let {nome, destino, duracao, descricao, preco, datas_disponiveis, image_id } = req.body
  const itemOriginal = req.body.itemOriginal

  nome = nome || itemOriginal.nome
  destino = destino || itemOriginal.destino
  duracao = duracao || itemOriginal.duracao
  descricao = descricao || itemOriginal.descricao
  preco = preco || itemOriginal.preco
  datas_disponiveis = datas_disponiveis || itemOriginal.datas_disponiveis
  image_id = image_id || itemOriginal.image_id
  
  try {
    if (!req.body.nome) {
      return res.status(404).send("Falhou pois req.body está vazio")
    }
    pool.connect()
    await pool.query(query, [nome, destino, duracao, descricao, preco, datas_disponiveis, image_id, itemID])
    res.send("Item alterado com sucesso")
    console.log("\x1b[32m Item foi alterado com sucesso!\x1b[0m")
  } catch (err) {
    res.status(400).json({
      message: "Não foi possível editar o item",
      err: err})
  }
}
