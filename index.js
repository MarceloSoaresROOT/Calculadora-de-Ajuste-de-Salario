import express from 'express';

const host = 'localhost';
const porta = 3000;
const server = express();

server.get('/', (req, res) => {
    //pegando dados url
    const { idade, sexo, salario_base, anoContratacao, ano_atual, matricula } = req.query;
    // se por acaso o usuario nao digitar nada, mostra só a tabela
    if (!idade) {
        return res.send(gerarPaginaHtml("Informe os dados na URL para calcular o reajuste."));
    }
    //verificar os dados digitados na url
    const idadeNumero = parseInt(idade);
    const salarioBaseNumero = parseFloat(salario_base);
    const anoContratacaoNumero = parseInt(anoContratacao);
    const matriculaNumero = parseInt(matricula);
    const anoAtualNumero = parseInt(ano_atual);
    //evitando erros e alertando o usuario
    let erros = [];
    if (isNaN(idadeNumero) || idadeNumero <= 16) erros.push("Idade não valida. Precisa ser maior de 16 anos.");
    if (isNaN(salarioBaseNumero)) erros.push("O salário base deve ser um número real válido.");
    if (isNaN(anoContratacaoNumero) || anoContratacaoNumero <= 1960) erros.push("O ano de contratação deve ser maior que 1960.");
    if (isNaN(anoAtualNumero) || anoAtualNumero <= 1900) erros.push("O ano atual deve ser maior que 1900.");
    if (isNaN(matriculaNumero) || matriculaNumero <= 0) erros.push("A matrícula deve ser maior que zero.");
    if (erros.length > 0) {
        return res.send(gerarPaginaHtml(`<h3 style="color: red;">Erro: ${erros.join(' | ')}</h3>`));
    }
    //calculos de salario e aumentos
    let reajustePercent = 0;
    let valorExtra = 0;
    const tempoEmpresa = anoAtualNumero - anoContratacaoNumero;
    const s = sexo?.toUpperCase();
    if (idadeNumero >= 18 && idadeNumero <= 39) {
        if (s === 'M') { reajustePercent = 0.10; valorExtra = (tempoEmpresa <= 10) ? -10 : 17; }
        else { reajustePercent = 0.08; valorExtra = (tempoEmpresa <= 10) ? -11 : 16; }
    } 
    else if (idadeNumero >= 40 && idadeNumero <= 69) {
        if (s === 'M') { reajustePercent = 0.08; valorExtra = (tempoEmpresa <= 10) ? -5 : 15; }
        else { reajustePercent = 0.10; valorExtra = (tempoEmpresa <= 10) ? -7 : 14; }
    } 
    else if (idadeNumero >= 70 && idadeNumero <= 99) {
        if (s === 'M') { reajustePercent = 0.15; valorExtra = (tempoEmpresa <= 10) ? -15 : 13; }
        else { reajustePercent = 0.17; valorExtra = (tempoEmpresa <= 10) ? -17 : 12; }
    }
    const novoSalario = (salarioBaseNumero * (1 + reajustePercent)) + valorExtra;
    //mostrando o resultado em uma tabela
    const resultadoHTML = `
        <div style="background: #e0ffd4; padding: 20px; border: 2px solid #27ae60; margin-top: 20px; text-align: center; font-family: Arial;">
            <h3 style="color: #27ae60;">Cálculo Realizado para Matrícula: ${matriculaNumero}</h3>
            <p>Salário Base: <strong>R$ ${salarioBaseNumero.toFixed(2)}</strong> | Reajuste: <strong>${(reajustePercent*100).toFixed(0)}%</strong></p>
            <p>Tempo de Empresa: <strong>${tempoEmpresa} anos</strong> (${valorExtra < 0 ? 'Desconto' : 'Acréscimo'}: R$ ${Math.abs(valorExtra).toFixed(2)})</p>
            <h2 style="color: #2c3e50;">Novo Salário: R$ ${novoSalario.toFixed(2)}</h2>
        </div>
    `;
    res.send(gerarPaginaHtml(resultadoHTML));
});
//gerar novamente a tabela
function gerarPaginaHtml(conteudoExtra) {
    return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Calculadora de Ajuste</title>
</head>
<body style="font-family: Arial; padding: 20px; background-color: #f4f4f4;">
    <h2 style="text-align: center;">Sistema de Reajuste Salarial</h2>
  <div style="max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px;">
     <p><strong>Como usar:</strong> Adicione os dados na URL. Exemplo:<br>
      <code style="background: #eee; padding: 5px;">?idade=30&sexo=F&salario_base=3000&anoContratacao=2020&ano_atual=2026&matricula=555</code></p>
        <table style="border-collapse: collapse; width: 100%; text-align: center; background-color: #000; color: yellow;">
        <tr style="background: #333;">
                <th>Faixa etária</th><th>Sexo</th><th>Reajuste</th><th>Até 10 anos (Desc.)</th><th>+10 anos (Acrésc.)</th></tr>
            <tr><td rowspan="2">18 – 39</td><td>M</td><td>10%</td><td>R$ 10,00</td><td>R$ 17,00</td></tr>
            <tr><td>F</td><td>8%</td><td>R$ 11,00</td><td>R$ 16,00</td></tr>
            <tr><td rowspan="2">40 – 69</td><td>M</td><td>8%</td><td>R$ 5,00</td><td>R$ 15,00</td></tr>
            <tr><td>F</td><td>10%</td><td>R$ 7,00</td><td>R$ 14,00</td></tr>
            <tr><td rowspan="2">70 – 99</td><td>M</td><td>15%</td><td>R$ 15,00</td><td>R$ 13,00</td></tr>
            <tr><td>F</td><td>17%</td><td>R$ 17,00</td><td>R$ 12,00</td></tr>
        </table>
        ${conteudoExtra}
    </div>
</body>
</html>`;
}
server.listen(porta, host, () => {
    console.log('Servidor rodando em http://' + host + ':' + porta);});