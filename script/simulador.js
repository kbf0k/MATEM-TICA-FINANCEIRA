let chartInstance; 
document.getElementById('prazoMeses').addEventListener('input', function() {
    const prazoMeses = document.getElementById('prazoMeses').value;
    document.getElementById('prazoValor').textContent = prazoMeses + (prazoMeses == 1 ? ' mês' : ' meses');
});

document.getElementById('calcular').addEventListener('click', function(event) {
    event.preventDefault();

    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    const prazoMeses = parseInt(document.getElementById('prazoMeses').value);
    const tipoJuros = document.getElementById('tipoJuros').value;
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;

    let saldoDevedor = [];
    let valorParcela = 0;
    let custoTotal = 0;
    let jurosPagos = 0;

    if (tipoJuros === 'opcao1') { // Juros Simples
        jurosPagos = valorTotal * taxaJuros * prazoMeses;
        custoTotal = valorTotal + jurosPagos;
        valorParcela = custoTotal / prazoMeses;

        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * (1 + taxaJuros * (i + 1)); 
            saldoDevedor.push(saldo.toFixed(2));
        }
        document.querySelector("#textoresultado h4:nth-of-type(1)").style.display = 'block';
        document.querySelector("#textoresultado h4:nth-of-type(1)").textContent = `Valor da Parcela: R$ ${valorParcela.toFixed(2)}`;
    } else if (tipoJuros === 'opcao2') { // Juros Compostos
        custoTotal = valorTotal * Math.pow(1 + taxaJuros, prazoMeses);
        jurosPagos = custoTotal - valorTotal;
        valorParcela = custoTotal / prazoMeses;

        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * Math.pow(1 + taxaJuros, i + 1); 
            saldoDevedor.push(saldo.toFixed(2));
        }
        document.querySelector("#textoresultado h4:nth-of-type(1)").style.display = 'none';
    }
    document.querySelector("#textoresultado h4:nth-of-type(2)").textContent = `Custo Total do Crédito: R$ ${custoTotal.toFixed(2)}`;
    document.querySelector("#textoresultado h4:nth-of-type(3)").textContent = `Total de Juros Pagos: R$ ${jurosPagos.toFixed(2)}`;

    document.getElementById('textoresultado').style.display = 'block';

    const ctx = document.getElementById('lineChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }
    document.getElementById('lineChart').style.display = 'block';
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: prazoMeses }, (v, k) => `Mês ${k + 1}`),
            datasets: [{
                label: 'Saldo Devedor',
                data: saldoDevedor,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
