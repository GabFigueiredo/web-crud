const itemsModel = require('../models/homeModel')

module.exports = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const response = await itemsModel.findById(id)
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
