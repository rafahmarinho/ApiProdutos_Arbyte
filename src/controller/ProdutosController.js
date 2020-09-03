const mongoose = require('mongoose');

let database;
let produtoSchema;

const connectDatabase = async () => {
    database = database || mongoose.connect('mongodb://127.0.0.1:27017/produtos', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return database;
}
const createProdutoSchema = async (database) => {
    if (produtoSchema) {
        return;
    }

    produtoSchema = new database.Schema({
        nome: String,
        preco: String,
        estoque: Number,
        codigoDeBarras: String
    }, {
        timestamps: true
    });
    database.model('Produto', produtoSchema);
}

const createProduto = async ({nome, preco, estoque, codigoDeBarras}) => {

    let database = await connectDatabase(); 
    await createProdutoSchema(database); 
    const {Produto} = database.models; 
    const produto = new Produto({
        nome,
        preco,
        estoque,
        codigoDeBarras
    }); 
    produto.save();
    return produto;
}

const readProduto = async () => {
    let database = await connectDatabase();
    await createProdutoSchema(database);
    const {Produto} = database.models;
    return Produto.find();
}

const readProdutoAZ = async (params) => {
    let database = await connectDatabase();
    await createProdutoSchema(database);
    const {Produto} = database.models;
    if (params.letra) {
        let letra = params.letra;
        let regex = new RegExp(`^${letra.charAt(0)}`, 'i')
        let response = await Produto.find({nome: regex});
        return {
            "status": 200,
            ...response
        };
    } else {
        throw {
            "status": 400,
            "message": "É necessário passar uma letra como parâmetro!"
        }
    }
}

const updateProduto = async ({id}, {nome, preco, estoque, codigoDeBarras}) => {
    let database = await connectDatabase();

    await createProdutoSchema(database);

    const {Produto} = database.models;

    return Produto.updateOne({_id: id}, {nome, preco, estoque, codigoDeBarras});
}

const deleteProduto = async ({id}) => {
    let database = await connectDatabase();

    await createProdutoSchema(database);

    const {Produto} = database.models;

    return Produto.deleteOne({_id: id});
}

module.exports = {
    createProduto,
    readProduto,
    readProdutoAZ,
    updateProduto,
    deleteProduto
}