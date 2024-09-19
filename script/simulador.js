let chartInstance;

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

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

    document.getElementById('resultados').style.display = 'none';

    if (isNaN(valorTotal) || isNaN(prazoMeses) || isNaN(taxaJuros) || !tipoJuros) {
        Swal.fire({
            icon: "warning",
            title: "Alguns dos campos não foram preenchidos",
            text: "Volte para inserir os dados novamente!",
        });
        return; 
    }

    if (taxaJuros > 0.15) {
        Swal.fire({
            icon: "warning",
            title: "A taxa de juros deve ser inferior a 15%",
            text: "Tente Novamente!",
        });
        return; 
    }

    let saldoDevedor = [];
    let valorParcela = 0;
    let custoTotal = 0;
    let jurosPagos = 0;

    if (tipoJuros === 'opcao1') { 
        jurosPagos = valorTotal * taxaJuros * prazoMeses;
        custoTotal = valorTotal + jurosPagos;
        valorParcela = custoTotal / prazoMeses;

        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * (1 + taxaJuros * (i + 1)); 
            saldoDevedor.push(saldo); 
        }
        document.querySelector("#textoresultado h4:nth-of-type(1)").style.display = 'block';
        document.querySelector("#textoresultado h4:nth-of-type(1)").textContent = `Valor da Parcela: R$ ${formatarValor(valorParcela)}`;
    } else if (tipoJuros === 'opcao2') {
        custoTotal = valorTotal * Math.pow(1 + taxaJuros, prazoMeses);
        jurosPagos = custoTotal - valorTotal;
        valorParcela = custoTotal / prazoMeses;

        for (let i = 0; i < prazoMeses; i++) {
            const saldo = valorTotal * Math.pow(1 + taxaJuros, i + 1); 
            saldoDevedor.push(saldo); 
        }
        document.querySelector("#textoresultado h4:nth-of-type(1)").style.display = 'none';
    }
    document.querySelector("#textoresultado h4:nth-of-type(2)").textContent = `Custo Total do Crédito: R$ ${formatarValor(custoTotal)}`;
    document.querySelector("#textoresultado h4:nth-of-type(3)").textContent = `Total de Juros Pagos: R$ ${formatarValor(jurosPagos)}`;

    document.getElementById('textoresultado').style.display = 'block';
    document.getElementById('resultados').style.display = 'block';

    const ctx = document.getElementById('lineChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }
    document.getElementById('lineChart').style.display = 'block';
    document.getElementById('limpar').style.display = 'block'; 
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: prazoMeses }, (v, k) => `Mês ${k + 1}`),
            datasets: [{
                label: 'Valor a ser Pago',
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

document.getElementById('limpar').addEventListener('click', function() {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja limpar o gráfico e os resultados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, limpar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('valorTotal').value = '';
            document.getElementById('prazoMeses').value = 1;
            document.getElementById('prazoValor').textContent = '1 mês';
            document.getElementById('taxaJuros').value = '';
            document.getElementById('tipoJuros').value = 'opcao1';

            document.getElementById('resultados').style.display = 'none';
            document.getElementById('textoresultado').style.display = 'none';
            document.getElementById('lineChart').style.display = 'none';

            if (chartInstance) {
                chartInstance.destroy();
            }
            document.getElementById('limpar').style.display = 'none';
        }
    });
});

