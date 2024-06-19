const itemsModel = require('../models/homeModel')

module.exports = async (req, res) => {
  try {
    const itemID = req.params.id
    console.log(req.body)
    if (!req.body.nome) {
      return res.status(404).send("Falhou pois req.body está vazio")
    }
    await itemsModel.findByIdAndUpdate(itemID, {
      nome: req.body.nome,
      destino: req.body.destino,
      duracao: req.body.duracao,
      preco: req.body.preco,
      datas_disponiveis: req.body.datas_disponiveis,
      imageId: req.body.imageId
    })
    res.send("De alguma forma deu pra alterar o item")
    console.log("Request feito")
  } catch (err) {
    res.status(400).send("Não foi possível editar o item")
    res.send(err)
  }
}
