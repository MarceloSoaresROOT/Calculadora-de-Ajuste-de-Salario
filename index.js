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
    <h2 style="color: black; text-align: center;">Bem-vindo à Calculadora de Ajuste de Salário</h2>
    <table style="border-collapse: collapse;
    width: 700px;
    text-align: center;
    font-family: Arial, sans-serif;
    margin: 0 auto;
    border: 1px solid #ffffff;
    background-color: #000000;
    color: yellow;">
  <tr>
    <th>Faixa etária</th>
    <th>Sexo</th>
    <th>Reajuste</th>
    <th>Desconto (até 10 anos na empresa)</th>
    <th>Acréscimo (mais de 10 anos na empresa)</th>
  </tr>

  <tr>
    <td rowspan="2">18 – 39</td>
    <td>M</td>
    <td>10%</td>
    <td>R$ 10,00</td>
    <td>R$ 17,00</td>
  </tr>
  <tr>
    <td>F</td>
    <td>8%</td>
    <td>R$ 11,00</td>
    <td>R$ 16,00</td>
  </tr>

  <tr>
    <td rowspan="2">40 – 69</td>
    <td>M</td>
    <td>8%</td>
    <td>R$ 5,00</td>
    <td>R$ 15,00</td>
  </tr>
  <tr>
    <td>F</td>
    <td>10%</td>
    <td>R$ 7,00</td>
    <td>R$ 14,00</td>
  </tr>

  <tr>
    <td rowspan="2">70 – 99</td>
    <td>M</td>
    <td>15%</td>
    <td>R$ 15,00</td>
    <td>R$ 13,00</td>
  </tr>
  <tr>
    <td>F</td>
    <td>17%</td>
    <td>R$ 17,00</td>
    <td>R$ 12,00</td>
  </tr>
</table>
</body>
</html>`);
});


server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
}); 