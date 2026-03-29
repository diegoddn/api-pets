import app from './app.js';

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`);
})