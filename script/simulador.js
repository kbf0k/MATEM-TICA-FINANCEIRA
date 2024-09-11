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

    const saldoDevedor = [];

    if (tipoJuros === 'opcao1') { 
        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * (1 + taxaJuros * (i + 1)); 
            saldoDevedor.push(saldo.toFixed(2));
        }
    } else if (tipoJuros === 'opcao2') { 
        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * Math.pow(1 + taxaJuros, i + 1); 
            saldoDevedor.push(saldo.toFixed(2));
        }
    }

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
