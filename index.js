import express from 'express';

const host = 'localhost';
const porta = 3000;


const server = express(); //oferecendo ao desenvolvedor um servidor http de modulo expresso

// recheando o servidor com funcionalidades
server.get('/', (requisicao, resposta) => {
    resposta.send(`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Ajuste de Salário</title>
</head>
<body>
    <h1>Olá, mundo!</h1>
    <h2>Bem-vindo à Calculadora de Ajuste de Salário</h2>
</body>
</html>`);
});


server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
}); 