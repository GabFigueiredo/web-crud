const itemsModel = require('./schemas/homeModel')

module.exports = async (req, res) => {
    try {
        const items = await itemsModel.find()
        // console.log('GET FOI CHAMADO')
        res.json(items)
    } catch(error) {
        console.log('Não deu')
        res.status(500).json({error: error.message})
    }
}   