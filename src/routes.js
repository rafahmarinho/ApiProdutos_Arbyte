const express = require('express');
const routes = express.Router();
const controller = require('./controller/ProdutosController');

// Rota do Create
routes.post("/produtos/create", (req, res) => {
    controller.createProduto(req.body)
        .then(result => res.send(result))
        .catch(err => console.error(err));
});

// Rota do Read
routes.get('/produtos', (req, res) => {
    controller.readProduto()
        .then(result => res.send(result))
        .catch(err => console.error(err));
});

// Rota Read por Letra
routes.get('/produtos/AZ/:letra?', (req, res) => {
    controller.readProdutoAZ(req.params)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Rota do Update
routes.put('/produtos/update/:id', (req, res) => {
    controller.updateProduto(req.params, req.body)
        .then(result => res.send(result))
        .catch(err => console.error(err))
});

// Rota do Delete
routes.delete('/produtos/delete/:id', (req, res) => {
    controller.deleteProduto(req.params)
        .then(result => res.send(result))
        .catch(err => console.error(err));
})

module.exports = routes; 