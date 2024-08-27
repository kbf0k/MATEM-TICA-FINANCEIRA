// Seleciona o elemento range e o elemento onde o valor será exibido
const rangeInput = document.getElementById('prazoMeses');
const valueDisplay = document.getElementById('prazoValor');

// Define o valor inicial na exibição
valueDisplay.textContent = `${rangeInput.value} meses`;

// Adiciona um ouvinte de eventos para atualizar o valor exibido
rangeInput.addEventListener('input', function() {
    valueDisplay.textContent = `${this.value} meses`;
});

