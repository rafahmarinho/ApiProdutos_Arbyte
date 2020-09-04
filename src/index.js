const express = require('express');
const { swaggerConfig } = require('./middlewares/swagger');
const routes = require('./routes');
const port = 3000;

const app = express();

app.use(express.json());
app.use(routes);
app.use(...swaggerConfig);

app.get('/', (req, res) => {
    res.send('Rota principal');
});

app.listen(port, () => {
    console.log(`Tô rodando na porta ${port}!`);
    console.log(`http://localhost:${port}`);
})
