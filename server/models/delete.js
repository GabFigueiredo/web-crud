const itemsModel = require('./schemas/homeModel')

module.exports = async (req, res) => {
    const id = req.params.id
    try {
        await itemsModel.findByIdAndDelete(id)
        res.status(200).send("Item excluído com sucesso")
    } catch (err) {
        res.status(400).json({
            message: "Erro ao tentar apagar do banco de dados",
            data: err,
    })
    }
}
