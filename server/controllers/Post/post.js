const pool = require('../../models/postgres')
const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, destino, duracao, descricao, preco, datas_disponiveis, imageId } = req.body
    const query = 'INSERT INTO Trips (nome, destino, duracao, descricao, preco, datas_disponiveis, image_id) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    let client;
    
    try {
        client = await pool.connect();
        await client.query(query, [nome, destino, duracao, descricao, preco, datas_disponiveis, imageId]);

        res.status(200).json({
            message: "Itens enviados com sucesso",
        })

    } catch (error) {
        res.status(400).json({
            message: 'Erro ao enviar dados',
            data: error
        })
    } finally {
        if (client) client.release()
    }
}