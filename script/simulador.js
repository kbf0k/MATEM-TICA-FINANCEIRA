
document.getElementById('prazoMeses').addEventListener('input', function() {
    const prazoMeses = document.getElementById('prazoMeses').value;
    document.getElementById('prazoValor').textContent = prazoMeses + ' meses';
});

document.getElementById('calcularBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    const prazoMeses = parseInt(document.getElementById('prazoMeses').value);
    const tipoJuros = document.getElementById('tipoJuros').value;
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;

    const saldoDevedor = [];
    for (let i = 0; i < prazoMeses; i++) {
        const saldo = valorTotal - ((valorTotal / prazoMeses) * i);
        saldoDevedor.push(saldo.toFixed(2));
    }

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: prazoMeses}, (v, k) => `Mês ${k + 1}`),
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
